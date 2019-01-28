/*
  A subclass of Noumenon, used to represent a smallish object such as a bed, a
  desk or a lamp.
*/

const Noumenon = require("../Noumenon")

class Item extends Noumenon {
  // TODO
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
