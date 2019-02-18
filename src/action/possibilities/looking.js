const {sub} = require('../../utility')


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
          sub("in order to see _ one must first go to where _ is", at, at),
        ]
    },
    consequence: (_subject, at) => {
      return at.describeAll()
    }
  },

  { verb:'look around',
    consequence: _subject => {
      let list = _subject.neighbours
      return [
        {_subject: _subject, _verb:'be', in:_subject.room},
        list ? {_subject: _subject, _verb:'see', _object:list} : null,
      ]
    }
  }
]
