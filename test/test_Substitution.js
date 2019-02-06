const TownHouse = require("../src/buildings/TownHouse")
const {Substitution} = require("../src/utility")

const house = new TownHouse

var sub = new Substitution("I am in _", house.kitchen)

console.log(sub)
console.log(sub.getString())
console.log(sub.getRegex())

console.log(
  Substitution.substitution("Would you look at _ and _", house.randomRoom(), house.randomRoom().randomItem())
)
