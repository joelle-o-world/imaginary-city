const TownHouse = require("../src/buildings/TownHouse")
const Substitution = require("../src/utility/Substitution")
const {randexp} = require('randexp')

const house = new TownHouse

console.log(Substitution)

var sub = new Substitution("I am in _", house.kitchen)

console.log(sub)
console.log(sub.getString())
console.log(sub.getRegex())

let reg
console.log(
  //Substitution.substitution("Would you look at _ and _", house.randomRoom(), house.randomRoom().randomItem())
  reg = new Substitution('I am friends with _', ['my dog', 'my cat']).getRegex()
)
console.log(randexp(reg))
