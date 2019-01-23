/*
  Room is an atomic element for the geography. Rooms contain doorways leading
  to other rooms. The can also contain Items and stuff like that. They are not
  fixed in space by numeric coordinates, it is more about how they connect to
  one another. Many subclasses of room will be defined, such as InteriorRoom,
  Street, Garden, Bathroom, TrainStation etc.
*/

const Noumenon = require("../Noumenon")
const Doorway = require("./Doorway.js")

class Room extends Noumenon {
  constructor() {
    this.items = []   // a list of all the items contained in this room
    this.exits = []  // a list of all the Doorways from this room to others
    this.entrances = [] // a list of all the Doorways leading from other rooms to this one
  }

  addExit(room, name) {
    let doorway = new Doorway(this, room)
    doorway.name = name
    this.exits.push(doorway)
    this.entrances.push(doorway)
  }
  addEntrance(room, name) {
    // call addExit on the `room`
    room.addExit(this, name)
  }
  addDoor(room, name) {
    // add a two way door
    this.addExit(room, name)
    room.addExit(room, name)
  }
}
Room.prototype.isRoom = true

module.exports = Room
