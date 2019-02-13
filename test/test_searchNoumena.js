const {
  allRelations,
  immediateRelations,
  search,
  firstMatch} = require("../src/searchNoumena")
const TownHouse = require('../src/buildings/TownHouse.js')
console.log(search)

let house = new TownHouse()
let room = house.kitchen
let item = room.randomItem()

console.log(item.ref())

let generator = search('a shirt', item)
console.log(generator)
console.log("All related:")
for(let o of generator) {
  if(o)
    console.log('\t-', o.ref())
  else
    console.log('null')
}

console.log(firstMatch('a dog', item))
