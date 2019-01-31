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
    let stuff = [
      "sink",
      "oven",
      "hob",
      "microwave",
    ].map(item => new GenericItem(item))

    let spoon = new GenericItem("spoon")
    stuff[1].isContainer = true
    spoon.container = stuff[1]
    console.log(spoon.refRegex())

    let table = new GenericItem('table')
    table.isSurface = true
    let courgette = new GenericItem('courgette')
    courgette.location = table
    console.log(courgette.refRegex())
    stuff.push(table)


    return stuff
  }
}
Kitchen.prototype.isKitchen = true
Kitchen.prototype.roomType = "kitchen"

Kitchen.prototype.addNouns("kitchen")

module.exports = Kitchen
