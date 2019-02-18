const {sub} = require("../../utility")
const {observe} = require("./wrap")

const pickUp = {verb:'pick up'}
pickUp.problem = (_subject, _object) => {
  if(!_subject.isPhysicalObject || !_subject.canBeLocationType.includes('holder'))
    return sub('_ has no way of holding things', _subject)
  if(!_object.isPhysicalObject || !_object.canHaveLocationType.includes('holder'))
    return sub('_ cannot be held', _object)
}
pickUp.expand = (_subject, _object) => {
  if(_object.room != _subject.room) {
    return [
      {_subject:_subject, _verb:'go', to:_object.location},
      {_subject:_subject, _verb:'pick up', _object:_object},
    ]
  } else {
    _object.setLocation(_subject, 'holder')
    return observe({_subject:_subject, _verb:'pick up', _object:_object})
  }
}

const putDown = {verb:'put down'}
putDown.expand = (_subject, _object) =>
  ({_subject: _subject, _object:_object, _verb:'put', in:_subject.room})

const putIn = {verb:'put', params:['_subject', '_object', 'in']}
putIn.problem = (_subject, _object, location) => {
  if(!_subject.canBeLocationType.includes('holder'))
    return sub('_ cannot pick things up', _subject)
  if(location.isRoom)
    return null
  else if(location.isPhysicalObject
    && location.canBeLocationType.includes('container')
    && _object.canHaveLocationType.includes('container'))
    return null
  else return true
}
putIn.expand = (_subject, _object, location) => {
  if(_object.location != _subject && _object.locationType != 'holder')
    return [
      {_subject:_subject, _verb:'pick up', _object:_object},
      {_subject:_subject, _verb:'put', _object:_object, in:location}
    ]

  let locationRoom = location.isRoom ? location : location.room
  let subjectRoom = _subject.room
  if(locationRoom != subjectRoom)
    return [
      {_subject: _subject, _verb:'go', to:locationRoom},
      {_subject:_subject, _verb:'put', _object:_object, in:location}
    ]

  if(location.isRoom)
    _object.setLocation(location, 'room')
  else
    _object.setLocation(location, 'container')

  return observe({_subject: _subject, _verb:'put',_object:_object, in:location})
}

const putOn = {verb:'put', params:['_subject', '_object', 'on']}
putOn.problem = (_subject, _object, location) => {
  if(!_subject.canBeLocationType.includes('holder'))
    return sub('_ cannot pick things up', _subject)
  if(location.isPhysicalObject
    && location.canBeLocationType.includes('surface')
    && _object.canHaveLocationType.includes('surface'))
    return null
  else return true
}
putOn.expand = (_subject, _object, location) => {
  if(_object.location != _subject && _object.locationType != 'holder')
    return [
      {_subject:_subject, _verb:'pick up', _object:_object},
      {_subject:_subject, _verb:'put', _object:_object, on:location}
    ]

  let locationRoom = location.room
  let subjectRoom = _subject.room
  if(locationRoom != subjectRoom)
    return [
      {_subject: _subject, _verb:'go', to:locationRoom},
      {_subject:_subject, _verb:'put', _object:_object, on:location}
    ]


  _object.setLocation(location, 'surface')

  return observe({_subject: _subject, _verb:'put',_object:_object, on:location})
}

module.exports = [
  pickUp,
  putDown,
  putIn,
  putOn,
]
