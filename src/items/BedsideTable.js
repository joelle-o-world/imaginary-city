/*
  Sub class of Table for representing bedside tables
*/

const Table = require("./Table")
const GenericItem = require("./GenericItem")

class BedsideTable extends Table {
  constructor() {
    super()

    // generate stuff
    if(Math.random() < 0.5) // 50% chance of an alarm clock
      (new GenericItem("alarm clock")).surface = this
    if(Math.random() < 0.5) // 50% chance of a book
      (new GenericItem("novel")).surface = this
  }
}
BedsideTable.prototype.addNouns("bedside table", "night stand")
BedsideTable.prototype.isBedsideTable
module.exports = BedsideTable
