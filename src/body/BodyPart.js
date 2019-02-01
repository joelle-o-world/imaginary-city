/*
  Subclass of PhysicalObject. The base class for individual body parts.
*/

const PhysicalObject = require("../PhysicalObject")

class BodyPart extends PhysicalObject {
  constructor() {
    super()

    this.body = null
  }

  get body() {
    return this._body
  }
  set body(body) {
    if(this._body) {
      // TODO: remove self from body
      if(this._body.bodyParts.includes(this))
        this._body.bodyParts.splice(this._body.bodyParts.indexOf(this), 1)
      this._body = null
    }
    if(body && body.isBody) {
      body.bodyParts.push(this)
      this._body = body
    }
  }

  get owner() {
    if(this.body)
      return this.body.owner
    else
      return null
  }
}
BodyPart.prototype.isBodyPart = true
BodyPart.prototype.nouns = ["body part"]

BodyPart.prototype.isSurface = true
// BodyPart's are attached together by putting them on top of each other.

module.exports = BodyPart
