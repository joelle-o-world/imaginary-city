const CommandTemplate = require("../explorer/CommandTemplate.js")
const Explorer = require("../explorer/Explorer")
const Enviroment = require("../explorer/Enviroment")
const TownHouse = require("../src/buildings/TownHouse")
const utility = require("../src/utility")

let enviroment = new Enviroment
let person = enviroment.protagonist
let house = new TownHouse
person.location = house.randomRoom()

let allNoumena = enviroment.allNoumena

function describeSurroundings() {
  let room = person.location
  if(room.numberOfItems) {
    console.log("Inside", room.ref({article:"the"}), "there's", utility.quantify(room.numberOfItems, "item")+":")
    for(var i in room.items)
      console.log("\t-", room.items[i].ref({article:"a", detail:2}))
  } else
    console.log(room.ref({article:"The"}), "is empty.")
  // report doors
  var accessibleRooms = room.accessibleRooms
  console.log(
    "There's",
    utility.quantify(accessibleRooms.length, "door"),
    "leading to",
    utility.printList(accessibleRooms.map(r => r.ref({detail: 0, article:"a"}))) + "."
  )
}

function moveCharacter(room) {
  if(!room.isRoom)
    return person.ref() + " walked into "+ room.ref() + ", "+
      "which proved inadvantageous."

  var oldLocation = person.location
  person.location = room

  console.log(person.ref() + " leaves " + oldLocation.ref({article:"the"}) + " and goes into " + room.ref()+".")

  // report items
  describeSurroundings()
}
function goThroughDoor(door) {
  if(!door.isDoor)
    return person.ref() +
      " attempted to go through "+ door.ref() +
      " as though it were a door."

  let to = door.fromTo(person.location)
  if(to)
    return moveCharacter(to)
  else
    return person.ref() +
    " tried to walk through a door which was not connected to the room they were in."
}

var game = new Explorer(enviroment)

game.addCommand(
  "look at _",
  thing => person.ref() + " looks at " + thing.ref({detail: 3}) + ".",
)
game.addCommand(["go to _", "go into _"], room => moveCharacter(room))
game.addCommand(
  ["go out", "leave", "exit"],
  () => moveCharacter(person.location.randomAccessibleRoom())
)
game.addCommand(
  ["what color is _", "what colour is _"],
  o => o.color
        ? "The "+o.noun+" is "+o.color+"."
        : "The "+o.noun+" is without color.",
)
game.addCommand("go through _", door => goThroughDoor(door))

// intro
console.log("\n\n")
console.log(person.ref(), "is in", person.location.ref({article:"the"}) + ".")
describeSurroundings()

console.log("\n")

game.listen()
