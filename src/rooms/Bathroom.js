/*
  Bathroom is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Bathroom extends InteriorRoom {
  // TODO
}
Bathroom.prototype.isBathroom = true
Bathroom.prototype.roomType = "bathroom"

module.exports = Bathroom
