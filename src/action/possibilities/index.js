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
    verb:'go',
    problem: (_subject, through) => {
      if(!through.isDoor)
        return sub(
          '_ cannot go through _ because it is not a door',
          _subject, through)
      if(!through.fromTo(_subject.room))
        return sub(
          '_ cannot go through _ because it is nowhere to be seen',
          _subject, through)
    },
    consequence: (_subject, through) => {
      let destination = through.fromTo(_subject.location)
      _subject.location = destination
      return [{
          _subject:_subject, _verb:'enter', _object: destination,
        }
      ]
    }
  }
]
