/*
  A sub class of Door for representing actual doors, rather than the base class
  which is more abstract (representing any connection between two Rooms).
*/

const Door = require("./Door.js")
const random = require("../random")

class LiteralDoor extends Door {
  constructor(A, B) { // construct a door connecting room A to room B
    super(A, B)
    this.__suspendInit__("color")
    this.__suspendInit__("madeOf", random.material)
  }
}
module.exports = LiteralDoor
