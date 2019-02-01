/*
  Sub-class of table. For representing a desk.
*/

const Table = require("./Table")

class Desk extends Table {
}
Desk.prototype.nouns = ["desk"]
Desk.prototype.isDesk = true
module.exports = Desk
