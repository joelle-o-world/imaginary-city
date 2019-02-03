/*
  Sub-class of BodyPart to represent a head.
*/

const BodyPart = require("./BodyPart")
const Eyes = require("./Eyes")
const Mouth = require("./Mouth")
const Nose = require("./Nose")
const Neck = require("./Neck")

class Head extends BodyPart {
  constructor() {
    super()
    this.eyes = new Eyes()
    this.eyes.surface = this

    this.mouth = new Mouth()
    this.mouth.surface = this

    this.nose = new Nose()
    this.nose.surface = this

    this.ears = new Ears()
    this.ears.surface = this

    this.neck = new Neck()
    this.surface = this.neck
  }
}
Head.prototype.isHead = true
Head.prototype.nouns = ['head']
module.exports = Head
