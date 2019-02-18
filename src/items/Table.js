/*
  Base class for all manner of tables
*/

const Item = require("./Item")

class Table extends Item {
  constructor() {
    super()
  }
}
Table.prototype.isTable = true
Table.prototype.nouns = ["table"]
Table.prototype.canBe('surface')
module.exports = Table
