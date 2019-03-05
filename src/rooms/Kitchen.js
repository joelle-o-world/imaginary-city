/*
  Kitchen is a generative subclass of Room
*/

const InteriorRoom = require("./InteriorRoom.js")
const GenericItem = require("../items/GenericItem")
const Refridgerator = require('../items/Refridgerator')
const Microwave = require('../items/Microwave')

class Kitchen extends InteriorRoom {
  constructor() {
    super()
  }

  generateContents() {
    let stuff = [
      "sink",
      "oven",
      "hob",
    ].map(item => new GenericItem(item))

    let spoon = new GenericItem("spoon")
    stuff[1].canBe('container')
    spoon.container = stuff[1]

    let table = new GenericItem('table')
    table.canBe('surface')
    let courgette = new GenericItem('courgette')
    courgette.location = table
    stuff.push(table)

    stuff.push(new Refridgerator)
    stuff.push(new Microwave)


    return stuff
  }
}
Kitchen.prototype.isKitchen = true
Kitchen.prototype.roomType = "kitchen"

Kitchen.prototype.nouns = ['kitchen']

module.exports = Kitchen
