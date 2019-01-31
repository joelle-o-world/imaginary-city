/*
  InteriorRoom is a subclass of Room. It is used as a super class for indoor
  rooms.
*/

const Room = require("./Room.js")
const utility = require("../utility")

class InteriorRoom extends Room {
  // TODO
  constructor() {
    super()
    this.__suspendInit__("flooring")
  }
}
InteriorRoom.prototype.isInteriorRoom = true

InteriorRoom.prototype.nouns = ["room"]

InteriorRoom.prototype.addDescriptorFunctions({
  with: [
    room => room.flooring+" flooring",
    room => utility.quantify(room.doors.length, "door"),
  ],
  in: [
    room => room.house.getDescriptiveReference({article:"a"})
  ],
  containing:[
    room => room.contents.map(item => item.refRegex()),
  ]
})

module.exports = InteriorRoom
