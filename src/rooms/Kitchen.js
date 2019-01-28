/*
  Kitchen is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")

class Kitchen extends InteriorRoom {
  // TODO
}
Kitchen.prototype.isKitchen = true
Kitchen.prototype.roomType = "kitchen"

Kitchen.prototype.nouns = ["kitchen"]

module.exports = Kitchen
