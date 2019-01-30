/*
  Bathroom is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Bathroom extends InteriorRoom {
  // TODO
  generateContents() {
    return [
      "toilet",
      "sink",
    ]
  }
}
Bathroom.prototype.isBathroom = true
Bathroom.prototype.roomType = "bathroom"

Bathroom.prototype.addNouns("bathroom", "toilet")

module.exports = Bathroom
