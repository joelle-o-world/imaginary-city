const {sub} = require('../../utility')
const Action = require('../Action')
const random = require('../../random')

module.exports = [
  // looking around
  { verb:'admire',
    consequence: (_subject, _object) => [
      sub('_ soon became shy and looked away', _object)
    ]
  },

  { verb:'look',
    problem: (_subject, at) => {
      if(_subject.room != at.room)
        return [
          sub("_ is too far away", at),
          "NOTE: you can only interact with things in the same room.",
          "To leave the room try 'go through the door'"
        ]
    },
    consequence: (_subject, at) => {
      return at.describeAll()
    }
  },

  { verb:'look around',
    consequence: _subject => {
      let list = _subject.neighbours
      console.log(list)
      return {_subject: _subject, _verb:'see', _object:list}
    }
  },

  // MOVING ARROUND
  {
    // go through doors!
    verb:'go',
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
      else if(!_subject.room.accessibleRooms.includes(room))
        return sub('_ is too far away', to)
    },
    consequence: (_subject, to) => {
      let room = to.isRoom ? to : to.room
      _subject.location = room
      return room.describeAll()
    }
  },
  {
    verb: 'go out',
    consequence: _subject => {
      let room = _subject.room
      let door = room.randomExit()
      return {_subject:_subject, _verb:'go', through:door}
    },
    returnSelfAsConsequence:false,
  },

  // POINTLESS THINGS
  { verb:'dance',
    params: ['_subject'],
    returnSelfAsConsequence:false,
    consequence: _subject => sub('_ began to dance like _', _subject, random.nounPhraseWithAction())
  },
  { verb:'jump',
    params: ['_subject'],
    returnSelfAsConsequence:false,
    consequence: _subject => sub('_ jumped in the air like _', _subject, random.nounPhraseWithAction())
  },
]
