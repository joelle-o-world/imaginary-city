/*
  InteriorRoom is a subclass of Room. It is used as a super class for indoor
  rooms.
*/

const Room = require("./Room.js")
const utility = require("../utility")
const Sub = utility.Sub

class InteriorRoom extends Room {
  // TODO
  constructor() {
    super()
    this.__suspendInit__("flooring")
  }
}
InteriorRoom.prototype.isInteriorRoom = true

InteriorRoom.prototype.nouns = ["room"]

InteriorRoom.prototype.addDescriptorFunctions({
  adj: [
    room => (room.contents.length == 0) ? "empty" : null, // legal
  ],
  with: [
    room => room.flooring+" flooring", // legal
    room => utility.quantify(room.doors.length, "door"), // legal
  ],
  in: [
    (room, ctx) => room.house // legal
  ],
  containing:[
    (room,ctx) => room.contents // legal
  ]
})

InteriorRoom.prototype.addDescription(
  room => room.contents.length
    ? "Inside "+room.ref()+" there is "+room.randomItem().ref()+"."
    : null,
  room => room.contents.map(
    item => new Sub("Inside _ there is _.", room, item)
  )
)

module.exports = InteriorRoom
