const PossibilitySet = require('../action/PossibilitySet')
const formatAnything = require('./formatAnything.js')
const recursivelyExecute = require('../action/recursivelyExecute')
const DescriptionContext = require('../DescriptionContext')
const groupContractables = require("../action/groupContractables")
const searchNoumena = require('../searchNoumena')
const verbPhrase = require('../utility/conjugate/verbPhrase')

const EventEmitter = require('events')

class Game extends EventEmitter {
  constructor() {
    super()
    this.protagonist
    this.possibilities = new PossibilitySet()
    this._write = str => process.stdout.write(str)
    this.descriptionCtx = new DescriptionContext

    this.onProtagonistMove = (...args) => {
      this.emit('protagonistMove', ...args)
    }
  }

  input(str) {
    let action
    if(str == '') {
      action = this.possibilities.randomActionFor(this.protagonist)

      this.writeln('chosen random command,\n' + verbPhrase(action, 'imperative').str()+':')
    } else {
      action = this.possibilities.parseImperative(str, this.protagonist)
      this.writeln(str+':')
    }

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
      let formatted = formatAnything(bit, new DescriptionContext())
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

  get protagonist() {
    return this._protagonist
  }
  set protagonist(protagonist) {
    if(!protagonist || !protagonist.isNoumenon)
      throw "Game#set protagonist expects a Noumenon"

    // remove listeners from old protagonist
    if(this._protagonist)
      this._protagonist.removeListener('move', this.onProtagonistMove)

    // change the protagonist
    this._protagonist = protagonist

    // add listeners to the new protagonist
    protagonist.on('move', this.onProtagonistMove)

    // emit the `newProtagonist` event
    this.emit('changeProtagonist', this._protagonist)
  }
}
module.exports = Game
