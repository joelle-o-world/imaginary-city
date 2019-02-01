/*
  Subclass of BodyPart representing a set of eyes.
*/

const BodyPart = require("./BodyPart")

class Eyes extends BodyPart {
  constructor() {
    super()
    this.__suspendInit__("n", () => Math.ceil(Math.random()*5)) // number of eyes
    this.__suspendInit__("color")
  }
}
Eyes.prototype.isEyes = true
Eyes.prototype.nouns = ["eyes"]
module.exports = Eyes
