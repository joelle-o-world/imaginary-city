/*
  A Bedroom is a generative subclass of Room.
*/

const InteriorRoom = require("./InteriorRoom.js")
const utility = require("../utility")

class Bedroom extends InteriorRoom {
  // TODO
}
Bedroom.prototype.isBedroom = true
Bedroom.prototype.roomType = "bedroom"

Bedroom.prototype.nouns = ["bedroom"]

Bedroom.prototype.addDescriptorFunctions({
  "belonging to": [
    room => room.occupant ? room.occupant.getDescriptiveReference() : null
  ]
})

module.exports = Bedroom
