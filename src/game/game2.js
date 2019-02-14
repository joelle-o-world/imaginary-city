const Game = require("./Game")
const TownHouse = require("../buildings/TownHouse")
const Person = require("../people/Person")

const allPossibilities = require('../action/possibilities')




// initialise the game
let myGame = new Game()
for(var poss of allPossibilities)
  myGame.possibilities.add(poss)

myGame.createWorld = function() {
  let house = new TownHouse
  let protagonist = new Person
  protagonist.location = house.randomRoom()

  myGame.protagonist = protagonist
}

myGame.intro = function() {
  this.print(this.protagonist.ref()+' is in '+this.protagonist.location.ref())
}

module.exports = myGame
