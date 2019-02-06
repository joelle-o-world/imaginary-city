const specarr = require("../src/utility/specarr")
const TownHouse = require("../src/buildings/TownHouse")

let house = new TownHouse().kitchen

let arr = house.descriptorFunctions.containing
console.log("contracted:", arr)
let expanded = specarr.expand(house, arr)
//console.log("expanded:", expanded)
let random = specarr.randomString(house, arr)
console.log("random:", random)
