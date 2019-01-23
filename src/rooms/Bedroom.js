/*
  A Bedroom is a generative subclass of Room.
*/

const InteriorRoom = require("./InteriorRoom.js")

class Bedroom extends InteriorRoom {
  // TODO
}
Bedroom.prototype.isBedroom = true
Bedroom.prototype.roomType = "bedroom"

module.exports = Bedroom
