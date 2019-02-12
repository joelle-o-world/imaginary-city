const Possibility = require("../src/Possibility")
const Kitchen = require("../src/rooms/Kitchen.js")
const verbPhrase = require("../src/utility/conjugate/verbPhrase.js")

let possibility1 = new Possibility({
  verb: 'go',
  consequence: (_subject, to) => _subject.location = to
})

let possibility2 = new Possibility({
  verb: 'be',
  consequence: (_subject, IN) => _subject.location = IN,
  condition: (_subject, IN) => _subject.room == IN || _subject.container == IN,
})


let kitchen = new Kitchen()
let kitchen2 = new Kitchen()
let item1 = kitchen.randomItem()

let action1 = {
  _verb: 'be',
  _subject: item1,
  in: kitchen,
}
let action2 = {
  _verb: 'be',
  _subject: kitchen,
  in: item1,
}
let action3 = {
  _verb: 'be',
  _subject: item1,
  in: kitchen2,
}

/*console.log(
  verbPhrase(action1).str()+":", possibility1.checkTruth(action1), '\n'+
  verbPhrase(action1).str()+":", possibility2.checkTruth(action1), '\n'+
  verbPhrase(action2).str()+":", possibility2.checkTruth(action2), '\n'
)
possibility2.execute(action3)
console.log(
  verbPhrase(action3).str(), possibility2.checkTruth(action3),
)

console.log(
  possibility1.commandString(), '\n'+
  possibility2.commandString(), '\n'
)*/

console.log(possibility1.parseImperative("go to the shop"))
