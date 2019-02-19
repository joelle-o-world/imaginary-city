const {sub} = require('../../utility')
const {observe} = require('./wrap')

const {getDoors} = require('../../rooms/getRoute')

const goThrough = { verb:'go',
  params: ['_subject', 'through'],
  problem: (_subject, through) => {
    if(!_subject.isPhysicalObject)
      return sub('_ cannot move', _subject)
    if(!through.isDoor)
      return sub('_ is not a door', through)
    if(!through.fromTo(_subject.room))
      return sub('_ is nowhere to be seen', through)

  },
  expand: (_subject, through) => {
    if(_subject.locationType == 'surface')
      return [
        {_subject:_subject, _verb:'get off'},
        {_subject:_subject, _verb:'go', through:through},
      ]
    if(_subject.locationType == 'container')
      return [
        {_subject:_subject, _verb:'get out'},
        {_subject:_subject, _verb:'go', through:through},
      ]

    let destination = through.fromTo(_subject.room)
    _subject.location = destination
    return [
      {_subject:_subject, _verb:'go', through:through,into: destination},
      //...destination.describeAll()
    ]
  }
}

const goTo = { verb:'go',
  params: ['_subject', 'to'],
  problem: (_subject, to) => {
    let room = to.isRoom ? to : to.room
    if(!_subject.isPhysicalObject)
      return sub('_ cannot move', _subject)
    if(!room)
      return sub('_ is nowhere to be found', to)
    //else if(!_subject.room.accessibleRooms.includes(room))
      //return sub('_ is too far away', to)
  },
  expand: (_subject, to) => {
    let room = to.isRoom ? to : to.room

    let doors = getDoors(_subject.room, room)

    return [
      ...doors.map(door => ({
        _subject:_subject, _verb:'go', through:door
      })),
    ]
  }
}

const goOut = { verb: 'go out',
  params: ['_subject'],
  problem: _subject => {
    if(!_subject.isPhysicalObject)
      return sub('_ cannot move', _subject)
  },
  expand: _subject => {
    let room = _subject.room
    let door = room.randomExit()
    return {_subject:_subject, _verb:'go', through:door}
  },
}

const getOnto = {
  verb:'get',
  params:['_subject', 'onto'],
  problems(subject, surface) {
    if(!subject.isPhysicalObject || !subject.canHaveLocationType.includes('surface'))
      return true
    if(!surface.isPhysicalObject || !surface.canBeLocationType.includes('surface'))
      return true
  },
  expand(_subject, surface) {
    if(_subject.room != surface.room)
      return [
        {_subject:_subject, _verb:'go', to:surface.room},
        {_subject:_subject, _verb:'get', onto:surface}
      ]
    else {
      _subject.setLocation(surface, 'surface')
      return observe({_subject:_subject, _verb:'get', onto:surface})
    }
  }
}
const getOn = {
  verb:'get',
  params: ['_subject', 'on'],
  expand: (_subject, surface) => ({_subject:_subject, _verb:'get', onto:surface}),
}

const getInto = {
  verb:'get',
  params:['_subject', 'into'],
  problems(subject, container) {
    if(!subject.isPhysicalObject || !subject.canHaveLocationType.includes('container'))
      return true
    if(!container.isPhysicalObject || !container.canBeLocationType.includes('container'))
      return true
  },
  expand(_subject, container) {
    if(_subject.room != container.room)
      return [
        {_subject:_subject, _verb:'go', to:container.room},
        {_subject:_subject, _verb:'get', into:container}
      ]
    else {
      _subject.setLocation(container, 'container')
      return observe({_subject:_subject, _verb:'get', into:container})
    }
  }
}
const getIn = {
  verb: 'get',
  params:['_subject', 'in'],
  expand: (_subject, container) => ({
    _subject:_subject, _verb:'get', into:container}),
}

const getOut = {
  verb:'get out',
  expand(_subject) {
    if(_subject.locationType == 'container') {
      let container = _subject.location
      _subject.location = container.location
      return observe({
        _subject:_subject,
        _verb:'get',
        'out of': container,
        into:_subject.location,
      })
    }
  }
}

const getOff = {
  verb:'get off',
  expand(_subject) {
    if(_subject.locationType == 'surface') {
      let surface = _subject.location
      _subject.location = surface.location
      return observe({
        _subject:_subject,
        _verb:'get',
        'down from': surface,
      })
    }
  }
}
const getDown = {
  verb:'get down',
  expand(_subject) {
    return {_subject:_subject, _verb:'get off'}
  }
}

module.exports = [
  // go through doors!
  goThrough,
  goTo,
  goOut,
  getOnto,
  getInto,
  getOut,
  getOff,
  getDown,
  getOn,
  getIn,
]
