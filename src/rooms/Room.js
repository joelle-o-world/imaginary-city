/*
  Room is an atomic element for the geography. Rooms contain doorways leading
  to other rooms. The can also contain Items and stuff like that. They are not
  fixed in space by numeric coordinates, it is more about how they connect to
  one another. Many subclasses of room will be defined, such as InteriorRoom,
  Street, Garden, Bathroom, TrainStation etc.
*/

const Noumenon = require("../Noumenon")
const Door = require("./Door.js")

class Room extends Noumenon {
  constructor() {
    super()
    this.items = []   // a list of all the items contained in this room
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
}
Room.prototype.isRoom = true

module.exports = Room
