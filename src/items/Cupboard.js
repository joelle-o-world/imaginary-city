/*
  A base class for all kinds of cupboards.
*/

const Item = require("./Item.js")

class Cupboard extends Item {
  constructor() {
    super()
  }
}
Cupboard.prototype.isCupboard = true
Cupboard.prototype.nouns = ['cupboard']
Cupboard.prototype.canBe('container')
module.exports = Cupboard
