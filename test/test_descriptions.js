const TownHouse = require("../src/buildings/TownHouse.js")

var house1 = new TownHouse({})

for(var i=0; i<10; i++)
  console.log(house1.getDescriptiveReference("adj"), "\n")
