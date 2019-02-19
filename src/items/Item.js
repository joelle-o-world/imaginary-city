/*
  A subclass of Noumenon, used to represent a smallish object such as a bed, a
  desk or a lamp.
*/

const {sub} = require("../utility")

const PhysicalObject = require("../PhysicalObject")

class Item extends PhysicalObject {
}
Item.prototype.isItem = true

Item.prototype.addDescriptorFunctions({
  adj: [
    item => item.color,
    //item => item.owner ? sub("_'s", item.owner) : null,
  ],
  "made of": [
    item => item.madeOf,
  ],
  'belonging to': [
    item => item.owner,
  ],

  // ^NOTE: if these do not rely on any external noumena so a Sub is not needed.
})
module.exports = Item
