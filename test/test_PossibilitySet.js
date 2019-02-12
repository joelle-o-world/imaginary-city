const Possibility = require("../src/Possibility.js")
const PossibilitySet = require("../src/PossibilitySet.js")

const argv = require('minimist')(process.argv.slice(2))

let pset = new PossibilitySet(
  new Possibility({
    verb: 'eat',
    consequence: (_subject, _object) => console.log("EAT")
  }),
  new Possibility({
    verb: 'dance',
    consequence: _subject => console.log('DANCE!')
  })
)

for(var i in argv._)
  console.log(pset.parseImperative(argv._[i]))
