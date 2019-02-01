/*
  A Bedroom is a generative subclass of Room.
*/

const InteriorRoom = require("./InteriorRoom.js")
const utility = require("../utility")
const Person = require("../people/Person")

// furniture
const Bed = require("../items/Bed")
const Desk = require("../items/Desk")
const BedsideTable = require("../items/BedsideTable")

class Bedroom extends InteriorRoom {
  // TODO
  generateContents() {
    let stuff = [
      new Bed(), // always a bed
    ]
    if(Math.random() < 0.5) // 50% chance of occupant
      stuff.push(this.occupant = new Person())
    if(Math.random() < 0.5) // 50% chance of bedside table
      stuff.push(new BedsideTable)
    if(Math.random() < 0.5) // 50% chance of desk
      stuff.push(new Desk)

    return stuff
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
