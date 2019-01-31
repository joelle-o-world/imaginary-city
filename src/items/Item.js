/*
  A subclass of Noumenon, used to represent a smallish object such as a bed, a
  desk or a lamp.
*/

const PhysicalObject = require("../PhysicalObject")

class Item extends PhysicalObject {
}
Item.prototype.isItem = true

Item.prototype.addDescriptorFunctions({
  adj: [
    item => item.color,
  ],
  "made of": [
    item => item.madeOf,
  ],
})
module.exports = Item
