/*
  Sub-class of BodyPart for representing a mouth
*/

const BodyPart = require("./BodyPart.js")

class Mouth extends BodyPart {
  constructor() {
    super()
  }
}
Mouth.prototype.isMouth = true
Mouth.prototype.nouns = ["mouth"]

Mouth.prototype.isContainer = true
module.exports = Mouth
