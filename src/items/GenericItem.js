/*
  Subclass of Item. A quick way to generate items which do not do very much.
*/

const Item = require("./Item")
const random = require("../random")

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
  item => item.ref() + " is "+item.color+".",
  item => item.ref() + " is made of "+item.madeOf+'.',
)
module.exports = GenericItem
