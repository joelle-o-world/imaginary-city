const TownHouse = require("../src/buildings/TownHouse.js")

var house1 = new TownHouse({})

for(var i=0; i<10; i++){
  var house = new TownHouse()
  console.log(house.getDescriptiveReference())
  for(var j in house.allRooms)
   console.log("\t", parseInt(j)+1+".", house.allRooms[j].getDescriptiveReference())
  console.log("\n")
}
