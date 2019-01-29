/*
  Generative sub-class of BodyPart for representing a group of eyes
*/

const BodyPart = require("./BodyPart")

class Eyes extends BodyPart {
  constructor() {
    super()
    this.__suspendInit__("n", eyes => Math.ceil(Math.random()*10))
    this.__suspendInit__("color")
  }
}
module.exports = Eyes
