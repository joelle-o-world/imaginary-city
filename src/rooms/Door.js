/*
  The Door class is a sub-class of Noumenon which connects one Room instance to
  another. It needn't represent a literal door, just as Room needn't represent
  a literal room.
*/

const Noumenon = require("../Noumenon")
const regOp = require("../utility/regex")

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

  fromTo(room) { // given a room, where does this door lead.
    if(room == this.A)
      return this.B
    else if(room == this.B)
      return this.A
    else
      return null
  }
}

Door.prototype.isDoor = true
Door.prototype.nouns = ["door"]

Door.prototype.addDescriptorFunctions({
  adj: [
    door => door.color,
    door => regOp.or(
      door.A.nounRegex(),
      door.B.nounRegex(),
    ),
  ],
  "made of": [
    door => door.material,
  ],
  connecting: [
    door => door.A.ref() + " to " + door.B.ref(),
    door => door.B.ref() + " to " + door.A.ref(),
  ]
})

module.exports = Door
