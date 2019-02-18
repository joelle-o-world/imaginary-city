const {sub} = require('../../utility')


const look = {verb:'look'}
look.expand = _subject => ({_subject: _subject, verb:'look around'})

const lookAround = {verb:'look around'}
lookAround.expand = _subject => {
  let list = _subject.neighbours
  return [
    {_subject: _subject, _verb:'look around', _object:_subject.room},
    list ? {_subject: _subject, _verb:'see', _object:list} : null,
  ]
}

const lookAt = {verb: 'look'}
lookAt.problem = (_subject, at) => {
  if(_subject.room != at.room && at != _subject.location)
    return sub("in order to see _ one must first go to where _ is", at, at)
}
lookAt.consequence = (_subject, at) => {
  return at.describeAll()
}

const admire = {verb:'admire'}
admire.consequence = (_subject, _object) =>
  sub('_ soon became shy and looked away', _object)

module.exports = [
  // looking around
  admire,
  lookAt,
  look,
  lookAround,
]
