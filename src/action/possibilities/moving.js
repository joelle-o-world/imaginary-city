const {sub} = require('../../utility')

const {getDoors} = require('../../rooms/getRoute')

module.exports = [
  // go through doors!
  { verb:'go',
    problem: (_subject, through) => {
      if(!through.isDoor)
        return sub('_ is not a door', through)
      if(!through.fromTo(_subject.room))
        return sub('_ is nowhere to be seen', through)

    },
    consequence: (_subject, through) => {
      let destination = through.fromTo(_subject.room)
      _subject.location = destination
      return [{
          _subject:_subject, _verb:'enter', _object: destination,
        }
      ]
    }
  },

  { verb:'go',
    problem: (_subject, to) => {
      let room = to.isRoom ? to : to.room
      if(!_subject.isPhysicalObject)
        return sub('_ cannot move', _subject)
      if(!room)
        return sub('_ is nowhere to be found', to)
      //else if(!_subject.room.accessibleRooms.includes(room))
        //return sub('_ is too far away', to)
    },
    consequence: (_subject, to) => {
      let room = to.isRoom ? to : to.room

      let doors = getDoors(_subject.room, room)

      _subject.location = room

      return [
        {
          _subject:_subject, _verb:'go', through:doors
        },
        ...to.describeAll(),
      ]
    }
  },
  { verb: 'go out',
    consequence: _subject => {
      let room = _subject.room
      let door = room.randomExit()
      return {_subject:_subject, _verb:'go', through:door}
    },
    returnSelfAsConsequence:false,
  },
]
