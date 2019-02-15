const {sub} = require('../../utility')

const random = require('../../random')

module.exports = [
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
