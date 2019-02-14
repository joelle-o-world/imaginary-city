/*
  A list of Possibilities
*/
const Possibility = require("./Possibility")

class PossibilitySet {
  constructor(...possibilities) {
    this.possibilities = []
    this.add(...possibilities)
  }

  parseImperative(str, subject) {
    // checks an imperative NL string against all possibilities in the set.
    for(var i in this.possibilities) {
      let action = this.possibilities[i].parseImperative(str, subject)
      if(action)
        return action
    }
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

  execute(action) {
    console.log('calling PossibilitySet#execute')
    for(var poss of this.possibilities) {
      let params = poss.actionToParams(action)
      if(params) {
        console.log('about to execute', action, 'with', poss)
        return poss.execute(action)
      }
    }
  }
}
PossibilitySet.prototype.isPossibilitySet = true
module.exports = PossibilitySet
