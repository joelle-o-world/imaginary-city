/*
  Subclass of BodyPart for representing a hand
*/

const BodyPart = require("./BodyPart")

class Hand extends BodyPart {

}
Hand.prototype.canBe('container')
Hand.prototype.isHand = true
Hand.prototype.nouns = ["hand"]
module.exports = Hand
