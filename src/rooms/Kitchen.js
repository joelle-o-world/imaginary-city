/*
  Kitchen is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")
const GenericItem = require("../items/GenericItem")

class Kitchen extends InteriorRoom {
  constructor() {
    super()
  }

  generateContents() {
    return [
      "sink",
      "oven",
      "hob",
      "microwave",
      "table",
    ]
  }
}
Kitchen.prototype.isKitchen = true
Kitchen.prototype.roomType = "kitchen"

Kitchen.prototype.addNouns("kitchen")

module.exports = Kitchen
