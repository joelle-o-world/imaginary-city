/*
  Generative sub-class of BodyPart for representing a head

  Generative rules:
    - A head may have any number of eyes
    - may have a nose or two
    - may or may not have
    - may have some number of ears
    - may have some numer of antennae
    - may or may not have a hair-style
*/

const BodyPart = require("./BodyPart")
const Eyes = require("./Eyes")

class Head extends BodyPart {
  constructor() {
    super()
    this.eyes = new Eyes()
  }
}
module.exports = Head
