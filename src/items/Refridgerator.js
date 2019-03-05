const Cupboard = require('./Cupboard')
const Buzzing = require('../sound/ambient/Buzzing')

class Refridgerator extends Cupboard {
  constructor() {
    super()
    this.makeSound(new Buzzing)
  }
}
Refridgerator.prototype.nouns = ['refridgerator', 'fridge']
module.exports = Refridgerator
