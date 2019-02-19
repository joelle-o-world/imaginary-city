const searchNoumena = require('../../searchNoumena')
const {observe} = require("./wrap")

const sleep = {
  verb:'sleep',
  params: ['_subject'],
  problem: _subject => {
    console.log('calling problem')
    if(!searchNoumena.firstMatch('a bed', _subject))
      return sub("_ couldn't find anywhere to sleep", _subject)
  },
  expand: _subject => {
    let bed = searchNoumena.firstMatch('a bed', _subject)
    console.log('bed:',bed)
    return [
      {_subject:_subject, _verb:'get', into:bed},
      observe({_subject:_subject, _verb:'go', to:'sleep'})
    ]
  },
}

const gotosleep = {
  verb:'go to sleep',
  expand: _subject => ({_subject:_subject, _verb:'sleep'}),
}

module.exports = [
  sleep,
  gotosleep
]
