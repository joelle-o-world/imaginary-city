const Game = require("./Game")
const TownHouse = require("../buildings/TownHouse")
const Person = require("../people/Person")
const {sub} = require("../utility")

const allPossibilities = require('../action/possibilities')




// initialise the game
let myGame = new Game()
for(var poss of allPossibilities)
  myGame.possibilities.add(poss)
myGame.possibilities.add({
  verb: 'become',
  expand: (_subject, _object) => {
    myGame.protagonist = _object
    return {
      _subject: sub('the spirit of _', _subject),
      _verb:'posess',
      _object: sub('the body of _', _object)
    }
  },
  returnSelfAsConsequence:false
})

myGame.createWorld = function() {
  let house = new TownHouse
  let protagonist = new Person
  protagonist.location = house.randomRoom()

  myGame.protagonist = protagonist
}

myGame.intro = function() {
  this.print(
    {_subject: this.protagonist, _verb:'be', in: this.protagonist.location}
  )
}

module.exports = myGame
