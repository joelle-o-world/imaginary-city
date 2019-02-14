const {sub} = require('../../utility')
const Action = require('../Action')

module.exports = [
  // looking around
  {
    verb:'admire',
    consequence: (_subject, _object) => [
      sub('_ soon became shy and looked away', _object)
    ]
  },

  // moving around
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
      let destination = through.fromTo(_subject.location)
      _subject.location = destination
      return [{
          _subject:_subject, _verb:'enter', _object: destination,
        }
      ]
    }
  },

  { verb:'go',
    problem: (_subject, to) => (!to.isRoom && !to.room) || !_subject.isPhysicalObject,
    consequence: (_subject, to) => _subject.location = to.isRoom ? to : to.room
  },

  { verb:'dance',
    params: ['_subject'],
    problem: (_subject) => true
  },
]
