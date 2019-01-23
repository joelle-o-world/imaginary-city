/*
  InteriorRoom is a subclass of Room. It is used as a super class for indoor
  rooms.
*/

const Room = require("./Room.js")

class InteriorRoom extends Room {
  // TODO
  constructor() {
    super()
    this.__suspendInit__("flooring")
  }
}
InteriorRoom.prototype.isInteriorRoom = true

InteriorRoom.prototype.addDescriptiveReferences(
  (room) => "the "+room.roomType+" with a " + room.flooring + " floor",
)

module.exports = InteriorRoom
