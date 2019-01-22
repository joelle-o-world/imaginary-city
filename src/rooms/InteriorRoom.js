/*
  InteriorRoom is a subclass of Room. It is used as a super class for indoor
  rooms.
*/

const Room = require("./Room.js")

class InteriorRoom extends Room {
  // TODO
}
InteriorRoom.prototype.isInteriorRoom = true
module.exports = InteriorRoom
