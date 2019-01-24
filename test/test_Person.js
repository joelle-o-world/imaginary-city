const Person = require("../src/people/Person")
const TownHouse  = require("../src/buildings/TownHouse.js")


var house = new TownHouse()
for(var i in house.allRooms)
  house.allRooms[i].occupant = new Person()

console.log("\n")
console.log(house.getDescriptiveReference())
var rooms = house.allRooms.sort(() => Math.random()*2-1)
for(var i in rooms) {
  console.log("\t", (parseInt(i)+1)+".", rooms[i].getDescriptiveReference())
}
console.log("\n")
