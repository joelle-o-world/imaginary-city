const Cupboard = require('./Cupboard')
const Buzzing = require('../sound/ambient/Buzzing')

class Microwave extends Cupboard {
  constructor() {
    super()
    this.makeSound(new Buzzing)
  }
}
Microwave.prototype.nouns = ["microwave", "microwave oven"]
module.exports = Microwave
