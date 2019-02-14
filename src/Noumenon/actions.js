const interpretActionQuery = require("../action/interpretActionQuery")
const PossibilitySet = require("../action/PossibilitySet")
const Action = require('../action/Action')

module.exports = Noumenon => {
  Noumenon.prototype.possibilities = new PossibilitySet()
  Noumenon.prototype.addPossibilty = function(...possibilities) {
    this.possibilities = this.possibilities.duplicate()
    this.possibilities.add(...possibilities)
  }

  Noumenon.prototype.parseImperative = function parseImperative(str) {
    // send the noumena a natural language command in the imperative tense
    let actionQueries = this.possibilities.parseImperative(str)
    for(var {actionQuery, possibility} of actionQueries) {
      let interpretted = interpretActionQuery(actionQuery, this)
      if(!interpretted)
        continue

      interpretted._subject = this

      console.log(this.ref(), 'interpretted', actionQuery, 'as', interpretted)
      return new Action(interpretted, possibility)
    }
  }

  Noumenon.prototype.command = function command(str) {
    console.log(this.ref(), 'recieved command:', str)
    let action = this.parseImperative(str)
    if(action)
      return action.execute()
    else
      return null
  }
}
