const argv = require("minimist")(process.argv.slice(2))
const parseNounPhrase = require("../explorer/parseNounPhrase.js")

for(var i in argv._) {
  console.log("parsing:", argv._[i])
  console.log(parseNounPhrase(argv._[i]))
}
