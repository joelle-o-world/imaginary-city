const {randexp} = require("randexp")

const Person = require("../src/people/Person.js")
const TownHouse = require("../src/buildings/TownHouse.js")
const regops = require("../src/utility").regex


let articleRE = "((a|the))"
let nouns = "(dog|cat|mouse)"
let concat = articleRE + nouns



let person = new Person
console.log(person)
console.log(person.nounRegex())
console.log(randexp(person.nounRegex()))

let house = new TownHouse
console.log(house.refRegex())
console.log(randexp(house.refRegex()))

console.log(regops.optionalConcatSpaced(
  "hello",
  "my",
  "friend"
))
