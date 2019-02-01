/*
  Noumenon subclass representing the body of an organism. A Body is a collection
  of body parts.
*/


const Noumenon = require("../Noumenon")

class Body extends Noumenon {
  constructor() {
    super()
    this.bodyParts = []
    this.owner = null // Person to whom this body belongs
  }
}
Body.prototype.isBody = true
Body.prototype.nouns = ["body"]
module.exports = Body
