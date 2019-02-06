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
  adj: [
    room => (room.contents.length == 0) ? "empty" : null,
  ],
  with: [
    room => room.flooring+" flooring",
    room => utility.quantify(room.doors.length, "door"),
  ],
  in: [
    (room, ctx) => room.house.getDescriptiveReference(ctx)
  ],
  containing:[
    (room,ctx) => room.contents//.map(item => item.refRegex(ctx)),
  ]
})

module.exports = InteriorRoom
