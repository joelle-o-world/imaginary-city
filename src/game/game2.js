const Game = require("./Game")
const TownHouse = require("../buildings/TownHouse")
const Person = require("../people/Person")





// initialise the game
let myGame = new Game()
myGame.possibilities.add(
  {
    verb:'admire',
    consequence: (_subject, _object) => console.log('called admire!')
  }
)
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
