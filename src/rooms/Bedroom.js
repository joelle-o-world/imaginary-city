/*
  A Bedroom is a generative subclass of Room.
*/

const InteriorRoom = require("./InteriorRoom.js")
const utility = require("../utility")
const Person = require("../people/Person")

class Bedroom extends InteriorRoom {
  // TODO
  generateContents() {
    this.occupant = new Person()
    return [
      "bed",
      this.occupant,
    ]
  }
}
Bedroom.prototype.isBedroom = true
Bedroom.prototype.roomType = "bedroom"

Bedroom.prototype.addNouns("bedroom")

Bedroom.prototype.addDescriptorFunctions({
  "belonging to": [
    room => room.occupant ? room.occupant.refRegex() : null
  ]
})

module.exports = Bedroom
