/*
  A Doorway connects one room to another. All doorways are one way doors,
  however two way doors can be represented as two identical/inverted Doorways.
*/


class Doorway {
  constructor(from, to) {
    this.name = "untitled door"
    this.leadingFrom = from   // the Room for which this doorway is an exit
    this.leadingTo = to       // the Room for which this doorway is an entrance
  }
}
module.exports = Doorway
