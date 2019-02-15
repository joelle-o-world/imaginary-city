const TownHouse = require('../src/buildings/TownHouse')
const getRoute = require("../src/rooms/getRoute")

let house = new TownHouse
let kitchen = house.kitchen

console.log(getRoute(house.kitchen, house.bathrooms[0]).map(r=>r.noun))
console.log(getRoute.getDoors(house.kitchen, house.bathrooms[0]).map(r=>r.ref()))
