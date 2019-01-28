/*
  Room is an atomic element for the geography. Rooms contain doorways leading
  to other rooms. The can also contain Items and stuff like that. They are not
  fixed in space by numeric coordinates, it is more about how they connect to
  one another. Many subclasses of room will be defined, such as InteriorRoom,
  Street, Garden, Bathroom, TrainStation etc.
*/

const Noumenon = require("../Noumenon")
const Door = require("./Door.js")
const items = require("../items")
const GenericItem = require("../items/GenericItem")

class Room extends Noumenon {
  constructor() {
    super()
    this.__suspendInit__("items", function() {
      if(this.generateContents) {
        let contents = this.generateContents(this)

        // convert strings to GenericItem's
        for(var i in contents) {
          if(contents[i].constructor == String)
            contents[i] = new GenericItem(contents[i])

          contents[i].location = this
        }
        return contents

      } else
        return []
    })   // a list of all the items contained in this room
    this.doors = []   // a list of all the doors connected to this room
  }

  addDoor(room, name) {
    // add a two way door
    new Door(this, room)
  }

  get exits() {
    // list of doors which lead from this room
    return this.doors.filter(door =>
      (door.A == this && door.allowAB) ||
      (door.B == this && door.allowBA)
    )
  }
  get entrances() {
    // list of doors which lead to this room
    return this.doors.filter(door =>
      (door.A == this && door.allowBA) ||
      (door.B == this && door.allowAB)
    )
  }

  randomItem() {
    // return a random item from this room
    if(this.items.length)
      return this.items[Math.floor(Math.random()*this.items.length)]
    else
      return null
  }
}
Room.prototype.isRoom = true

module.exports = Room
