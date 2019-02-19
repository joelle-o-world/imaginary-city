/*
  The base class for all Garments
*/

const PhysicalObject = require("../PhysicalObject")
const Item = require('../items/Item')

class Garment extends Item {
  constructor(noun) {
    super()
    if(noun)
      this.noun = noun
  }
}
Garment.prototype.isGarment = true
Garment.prototype.nouns = ["garment", "item of clothing"]
Garment.prototype.canHave('wearer')
module.exports = Garment
