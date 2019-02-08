/*
  The base class for all Garments
*/

const PhysicalObject = require("../PhysicalObject")

class Garment extends PhysicalObject {
  constructor() {
  }
}
Garment.prototype.isGarment = true
Garment.prototype.nouns = ["garment", "item of clothing"]
module.exports = Garment
