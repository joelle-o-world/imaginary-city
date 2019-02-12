const argv = require("minimist")(process.argv.slice(2))

const TownHouse = require('../src/buildings/TownHouse.js')
const Person = require('../src/people/Person.js')

const verbPhrase = require("../src/utility/conjugate/verbPhrase")


let house = new TownHouse()
let room = house.randomRoom()
let item = room.randomItem()
let person = new Person()
console.log(person)

let actions = [
  //{_subject: person, _verb: 'look', at: item, in:room},
  //{_subject: 'he', _verb: 'go', _object:'home', in:'his car', to:'Dorset'},
  //{_subject: 'they', _verb: 'dance', for:"2 hours"},
  //{_subject: '_subject', _verb:'have', _object:'cats'},
  {_subject: 'A sound', _verb:'play'}
]

console.log(verbPhrase.tenses)
for(var tense in verbPhrase.tenses) {
  console.log('\n'+tense.toUpperCase()+':')
  let subs = actions.map(action => verbPhrase(action, tense))
  let sentences = subs.map(sub => sub.getRegex())
  for(var i in sentences)
    console.log(sentences[i])
}


console.log("\n\n")
let reg = new RegExp(
  '^(?:'+verbPhrase.anyTenseRegex('eat').source.replace(/_subject/g, '(.+)')+')$'
)

console.log(reg)

console.log(reg.exec(argv._[0]))
