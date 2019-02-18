const {sub} = require('../../utility')
const GenericItem = require("../../items/GenericItem")

const random = require('../../random')

const dance = {
  verb:'dance',
  params: ['_subject'],
  expand: _subject => sub('_ began to dance like _', _subject, random.nounPhraseWithAction())
}

const jump = { verb:'jump',
  params: ['_subject'],
  expand: _subject => sub(
    '_ jumped in the air like _',
    _subject, random.nounPhraseWithAction()
  )
}

const playWith = {
  verb: 'play',
  consequence: (_subject, WITH) => sub("they had temendous fun together")
}

const poop = {
  verb:'poop',
  problem: _subject => {
    if(_subject.hasPooped)
      return sub('_ has pooped already', _subject)
  },
  consequence: _subject => {
    let thepoop = new GenericItem('poop')
    thepoop.room = _subject.room
    thepoop.owner = _subject
    _subject.hasPooped = true
    return thepoop.describeAll()
  }
}

const poo = {
  verb:'poo',
  expand: _subject => ({_subject:_subject, _verb:'poop'})
}

module.exports = [
  dance,
  jump,
  poop, poo,
  playWith
]
