/*
  The Door class is a sub-class of Noumenon which connects one Room instance to
  another. It needn't represent a literal door, just as Room needn't represent
  a literal room.
*/

const Noumenon = require("../Noumenon.js")

class Door extends Noumenon {
  constructor(room1, room2) {
    super()
    if(!room1 || !room2)
      throw "Door constructor needs two rooms."
    this.A = room1
    this.B = room2
    this.allowAB = true // allow passage from room A to room B
    this.allowBA = true // allow passage from room B to room A

    this.A.doors.push(this)
    this.B.doors.push(this)
  }
}
module.exports = Door
