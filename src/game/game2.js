const Game = require("./Game")
const TownHouse = require("../buildings/TownHouse")
const Person = require("../people/Person")
const {sub} = require("../utility")
const SoundPlayer = require("../sound/SoundPlayer")
const DuspOnce = require('../sound/DuspOnce')
const DuspLoop = require('../sound/DuspLoop')

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
      _verb: 'posess',
      _object: sub('the body of _', _object)
    }
  },
  returnSelfAsConsequence:false
})

myGame.createWorld = function() {
  let house = new TownHouse
  let protagonist = new Person
  protagonist.location = house.randomRoom()

  /*setInterval(() => {
    house.kitchen.randomItem().makeSound(new DuspOnce('O1000 * D0.1', 0.5))
  }, 3000)*/


  /*for(let room of house.allRooms) {
    room.makeSound(
      new DuspLoop('[Osc F:random*200]/10 + ([Noise f:random*4000] * random)/1000')
    )
  }*/

  protagonist.room.soundPlayer = new SoundPlayer(new AudioContext().destination)

  myGame.protagonist = protagonist
}

myGame.intro = function() {
  this.print(
    {_subject: this.protagonist, _verb:'be', in: this.protagonist.location}
  )
}

module.exports = myGame
