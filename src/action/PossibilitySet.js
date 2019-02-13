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
    // checks an imperative NL string against all possibilities in the set.
    // Returning a list of action queries
    // NOTE: an action query is an intermediary structure using NL string noun-
    //       phrases in place of noumena
    // This is because Possibilities and PossibiltySets are abstracted from
    // the subject. A Noumenon is needed to begin searching for matches to the
    // noun-phrase strings
    let actionQueries = []
    for(var i in this.possibilities) {
      let actionQuery = this.possibilities[i].parseImperative(str)
      if(actionQuery)
        actionQueries.push(actionQuery)
    }
    return actionQueries
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
