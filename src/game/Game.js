const PossibilitySet = require('../action/PossibilitySet')
const formatAnything = require('./formatAnything.js')
const recursivelyExecute = require('../action/recursivelyExecute')
const DescriptionContext = require('../DescriptionContext')
const groupContractables = require("../action/groupContractables")

class Game {
  constructor() {
    this.protagonist
    this.possibilities = new PossibilitySet()
    this._write = str => process.stdout.write(str)
    this.descriptionCtx = new DescriptionContext
  }

  input(str) {
    let action = this.possibilities.parseImperative(str, this.protagonist)
    if(action) {
      /*let {consequences} = action.execute()
      if(consequences) {
        this.print(action)
        this.print(...consequences)
      }*/
      let toPrint = recursivelyExecute([action], this.possibilities)
      let gathered = []
      for(let o of toPrint)
        gathered.push(o)
      this.print(...gathered)
    } else
      this.print("I'm sorry, my programmer hasn't thought of a response to '"+str+"'.")
  }

  begin() {
    if(this.createWorld)
      this.createWorld()
    if(this.intro)
      this.intro()
  }

  // output functions
  print(...stuff) {
    stuff = groupContractables(stuff, 'simple_past')
    for(let bit of stuff) {
      let formatted = formatAnything(bit, this.descriptionCtx)
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
