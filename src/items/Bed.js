/*
  Sub-class of item for representing a bed.
*/

const Item = require("./Item.js")
const GenericItem = require("./GenericItem")

class Bed extends Item {
  constructor() {
    super()

    this.bedsheets = new GenericItem('bedsheet')
    this.bedsheets.location = this

    this.pillow = new GenericItem('pillow')
    this.pillow.location = this

    this.bedsize = Math.random() < 0.5 ? 'double' : 'single'
    this.fourPoster = Math.random() < 0.1
  }
}

Bed.prototype.isBed = true

Bed.prototype.canBe('surface')

Bed.prototype.nouns = ['bed']

Bed.prototype.addDescriptorFunctions({
  adj: [
    bed => bed.bedsize,
    bed => bed.fourPoster ? "four-poster" : null,
    // ^NOTE: these do not rely on any external noumena so a Sub is not needed.
  ]
})

module.exports = Bed
