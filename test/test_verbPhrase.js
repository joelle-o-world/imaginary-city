const TownHouse = require('../src/buildings/TownHouse.js')
const Person = require('../src/people/Person.js')

const verbPhrase = require("../src/utility/conjugate/verbPhrase")


let house = new TownHouse()
let room = house.randomRoom()
let item = room.randomItem()
let person = new Person()
console.log(person)

let actions = [
  {subject: person, verb: 'look', at: item, in:room},
  {subject: 'he', verb: 'go', object:'home', in:'his car', to:'Dorset'},
  {subject: 'they', verb: 'dance', for:"2 hours"},
]

console.log(verbPhrase.tenses)
for(var tense in verbPhrase.tenses) {
  console.log('\n'+tense.toUpperCase()+':')
  let subs = actions.map(action => verbPhrase(action, tense))
  let sentences = subs.map(sub => sub.getString())
  console.log(sentences.join('\n'))
}
