/*
  Subclass of BodyPart for representing ears.
*/

const BodyPart = require("./BodyPart")

class Eyes extends BodyPart {
  constructor() {
    super()
    this.__suspendInit__("n", () => Math.ceil(Math.random()*5)) // number of eyes
  }
}
Ears.prototype.isEars = true
Ears.prototype.nouns = ["ears"]
module.exports = Ears
