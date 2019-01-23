/*
  LivingRoom is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class LivingRoom extends InteriorRoom {
  // TODO
}
LivingRoom.prototype.isLivingRoom = true
LivingRoom.prototype.roomType = "living room"

module.exports = LivingRoom
