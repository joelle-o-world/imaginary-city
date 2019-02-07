/*
  Subclass of Item. A quick way to generate items which do not do very much.
*/

const Item = require("./Item")
const random = require("../random")
const Sub = require("../utility/Substitution")

class GenericItem extends Item {
  constructor(noun) {
    super()
    this.noun = noun
    //this.nouns = [noun] handled automatically by setter
    this.__suspendInit__("color")
    this.__suspendInit__("madeOf", random.material)
  }
}
GenericItem.prototype.isGenericItem = true

GenericItem.prototype.addDescription(
  item => new Sub("_ is _", item, item.color),
  item => new Sub("_ is made of _", item, item.madeOf),
)
module.exports = GenericItem
