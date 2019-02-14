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

    // contents
    this.contents = [] // list of stuff thats in the room.
    this.__suspendInit__("contents", function() {
      if(this.generateContents) {
        this.contents = []
        let contents = this.generateContents(this)
        if(!contents) {
          console.warn("Generate contents failed")
          return []
        }

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
  get numberOfExits() {
    return this.exits.length
  }
  randomExit() {
    let doors = this.exits
    return doors[Math.floor(Math.random()*doors.length)]
  }
  get entrances() {
    // list of doors which lead to this room
    return this.doors.filter(door =>
      (door.A == this && door.allowBA) ||
      (door.B == this && door.allowAB)
    )
  }

  get accessibleRooms() {
    // list of rooms which can by accessed by an exit from this room
    let exits = this.exits
    let rooms = []
    for(var i in exits) {
      let room = this.exits[i].A == this ? this.exits[i].B : this.exits[i].A
      if(rooms.indexOf(room) == -1)
        rooms.push(room)
    }
    return rooms
  }
  randomAccessibleRoom() {
    var rooms = this.accessibleRooms
    return rooms[Math.floor(Math.random()*rooms.length)]
  }

  randomItem() {
    // return a random item from this room
    if(this.contents.length)
      return this.contents[Math.floor(Math.random()*this.contents.length)]
    else
      return null
  }

  removeContent(obj) {
    // remove an object from the contents of the room
    if(this.contents.includes(obj))
      this.contents.splice(this.contents.indexOf(obj), 1)
    else
      console.warn("WARNING: Tried to remove an object from a room but it couldn't be found")
  }

  get all() {
    // recursively generate list of all objects in the room
    let list = []
    for(var i in this.contents)
      list.push(...this.contents[i].all)
    return list
  }
}
Room.prototype.isRoom = true

module.exports = Room
