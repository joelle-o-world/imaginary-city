/*
  Base class for all manner of tables
*/

const Item = require("./Item")

class Table extends Item {
  constructor() {
    super()
    this.isSurface = true // things can be placed on tables
  }
}
Table.prototype.isTable = true
Table.prototype.nouns = ["table"]
module.exports = Table
