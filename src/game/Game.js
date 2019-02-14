const PossibilitySet = require('../action/PossibilitySet')
const formatAnything = require('./formatAnything.js')

class Game {
  constructor() {
    this.protagonist
    this.possibilities = new PossibilitySet()
    this._write = str => process.stdout.write(str)
  }

  input(str) {
    let action = this.possibilities.parseImperative(str, this.protagonist)
    if(action) {
      let consequences = action.execute()
      if(consequences)
        this.print(...consequences)
    } else
      this.print("I don't understand '"+str+"'")
  }

  begin() {
    if(this.createWorld)
      this.createWorld()
    if(this.intro)
      this.intro()
  }

  // output functions
  print(...stuff) {
    for(let bit of stuff) {
      let formatted = formatAnything(bit)
      if(formatted)
        this.write(formatted)
    }
    this.newline(2)
  }
  write(str) {
    this._write(str)
  }
  writeln(str) {
    this.write(str)
    this.newline()
  }
  newline(n=1) {
    for(var i=0; i<n; i++)
      this.write('\n')
  }
}
module.exports = Game
