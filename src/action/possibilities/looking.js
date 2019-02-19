const {sub} = require('../../utility')
const {observe} = require('./wrap')


const look = {verb:'look'}
look.expand = _subject => ({_subject: _subject, verb:'look around'})

const lookAround = {verb:'look around'}
lookAround.expand = _subject => {
  let list = _subject.neighbours
  return [
    {
      _subject: _subject,
      _verb:'look around',
      _object:_subject.container || _subject.room
    },
    list ? {_subject: _subject, _verb:'see', _object:list} : null,
  ]
}

const lookAt = {verb: 'look'}
lookAt.expand = (_subject, at) => {
  if(_subject.room != at.room && at != _subject.location)
    return [
      {_subject:_subject, _verb:'go', to:at.room},
      {_subject:_subject, _verb:'look', at:at},
    ]
  else
    return [
      observe({_subject:_subject, _verb:'look', at:at}),
      ...at.describeAll(),
    ]
}

const lookIn = {verb: 'look'}
lookIn.expand = (_subject, IN) => {
  if(_subject.room != IN.room && IN != _subject.location)
    return [
      {_subject:_subject, _verb:'go', to:IN.room},
      {_subject:_subject, _verb:'look', in:IN},
    ]
  else
    return [
      observe({_subject:_subject, _verb:'look', in:IN}),
      sub('inside _ there is _', IN, IN.containing || IN.contents)
    ]
}

const examine = {verb: 'examine'}
examine.expand = (_subject, _object) => {
  if(_subject.room != _object.room && _object != _subject.location)
    return [
      {_subject:_subject, _verb:'go', to:_object.room},
      {_subject:_subject, _verb:'examine', at:_object},
    ]
  else
    return [
      observe({_subject:_subject, _verb:'look', at:_object}),
      ..._object.describeAll(),
    ]
}

const admire = {verb:'admire'}
admire.consequence = (_subject, _object) =>
  sub('_ soon became shy and looked away', _object)

module.exports = [
  // looking around
  admire,
  lookAt,
  lookIn,
  look,
  lookAround,
  examine,
]
