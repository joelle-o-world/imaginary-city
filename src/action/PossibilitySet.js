/*
  A list of Possibilities
*/
const Possibility = require("./Possibility")

class PossibilitySet {
  constructor(...possibilities) {
    this.possibilities = []
    this.add(...possibilities)
  }

  parseImperative(str) {
    let possibleActions = []
    for(var i in this.possibilities) {
      let action = this.possibilities[i].parseImperative(str)
      if(action)
        possibleActions.push({action:action, possibility:this.possibilities[i]})
    }
    return possibleActions
  }

  add(...possibilities) {
    for(var i in possibilities) {
      let possibility = possibilities[i]
      if(possibility.isPossibility)
        this.possibilities.push(possibility)
      else if(typeof possibility == 'object')
        this.possibilities.push(new Possibility(possibility))
      else
        console.warn('strange possibility:', possibility)
    }
  }

  duplicate() {
    return new PossibilitySet(...this.possibilities)
  }
}
PossibilitySet.prototype.isPossibilitySet = true
module.exports = PossibilitySet
