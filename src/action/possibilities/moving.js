const {sub} = require('../../utility')

const {getDoors} = require('../../rooms/getRoute')

module.exports = [
  // go through doors!
  { verb:'go',
    params: ['_subject', 'through'],
    problem: (_subject, through) => {
      if(!_subject.isPhysicalObject)
        return sub('_ cannot move', _subject)
      if(!through.isDoor)
        return sub('_ is not a door', through)
      if(!through.fromTo(_subject.room))
        return sub('_ is nowhere to be seen', through)

    },
    consequence: (_subject, through) => {
      let destination = through.fromTo(_subject.room)
      _subject.location = destination
      return [
        {_subject:_subject, _verb:'enter', _object: destination},
        ...destination.describeAll()
      ]
    }
  },

  { verb:'go',
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
  },
  { verb: 'go out',
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
  },
]
