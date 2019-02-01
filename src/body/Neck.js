/*
  Subclass of BodyPart to represent a neck
*/

const BodyPart = require("./BodyPart")

class Neck extends BodyPart {
}
Neck.prototype.isNeck = true
Neck.prototype.nouns = ["neck"]
module.exports = Neck
