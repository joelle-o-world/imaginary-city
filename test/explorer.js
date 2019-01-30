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
console.log(allNoumena.map(thing => thing.getDescriptiveReference()))

var game = new Explorer(enviroment)
game.addCommand(
  "look at _",
  thing => person.ref() + " looks at " + thing.ref({detail: 3}) + ".",
)


game.addCommand("go to _", room => {
  if(!room.isRoom)
    return person.ref() + " walked into "+ room.ref() + ", "+
      "which proved inadvantageous."

  var oldLocation = person.location
  person.location = room

  console.log(person.ref() + " leaves " + oldLocation.ref({article:"the"}) + " and goes into the " + room.ref()+".")

  // report items
  if(room.numberOfItems) {
    console.log("Inside", room.ref({article:"the"}), "there's", utility.quantify(room.numberOfItems, "item")+":")
    for(var i in room.items)
      console.log("\t-", room.items[i].ref({article:"a", detail:2}))
  } else
    console.log(room.ref({article:"The"}), " is empty.")
  // report doors
  var accessibleRooms = room.accessibleRooms
  console.log(
    "There's",
    utility.quantify(accessibleRooms.length, "door"),
    "leading to",
    utility.printList(accessibleRooms.map(r => r.ref({detail: 0, article:"a"}))) + "."
  )
})

// intro
console.log(person.ref(), "is in", person.location.ref({article:"the"}) + ".")

game.listen()
