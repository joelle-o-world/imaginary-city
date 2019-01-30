/*
  Corridor is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Corridor extends InteriorRoom {
  // TODO
}
Corridor.prototype.isCorridor = true
Corridor.prototype.roomType = "corridor"

Corridor.prototype.addNouns("corridor")

module.exports = Corridor
