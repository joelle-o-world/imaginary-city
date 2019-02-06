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

  // ^NOTE: if these do not rely on any external noumena so a Sub is not needed.
})
module.exports = Item
