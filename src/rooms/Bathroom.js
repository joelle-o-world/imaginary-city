/*
  Bathroom is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Bathroom extends InteriorRoom {
  // TODO
}
Bathroom.prototype.isBathroom = true
Bathroom.prototype.roomType = "bathroom"

Bathroom.prototype.nouns = ["bathroom", "toilet"]

module.exports = Bathroom
