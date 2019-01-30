/*
  Staircase is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Staircase extends InteriorRoom {
  constructor() {
    super()
    this.numberOfSteps = Math.ceil(5 + Math.random()*20)
  }
}
Staircase.prototype.isStaircase = true
Staircase.prototype.roomType = "staircase"

Staircase.prototype.nouns = ["staircase", "stairwell"]

Staircase.prototype.addDescriptorFunctions({
  with: [
    staircase => staircase.numberOfSteps + " (" + staircase.flooring + ")? steps",
  ]
})

module.exports = Staircase
