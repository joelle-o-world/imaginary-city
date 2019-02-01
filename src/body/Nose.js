/*
  Subclass of BodyPart to represent noses
*/

const BodyPart = require("./BodyPart.js")

class Nose extends BodyPart {
}
Nose.prototype.isNose = true
Nose.prototype.nouns = ["nose"]
module.exports = Nose
