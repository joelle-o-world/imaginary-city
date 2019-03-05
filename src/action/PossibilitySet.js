/*
  A list of Possibilities
*/
const Possibility = require("./Possibility")
const Action = require('./Action')

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

  findMatch(action) {
    if(action.isAction)
      // assume it a object relation
      action = action.action

    for(var poss of this.possibilities)
      if(poss.actionToParams(action))
        return poss
  }

  randomAction(noumena) {
    // make a random action for a given pool of noumena
    let possibility = this.possibilities[Math.floor(Math.random()*this.possibilities.length)]
    return possibility.randomAction(noumena)
  }

  randomActionFor(subject) {
    // make a random action for a given subject
    let possibility = this.possibilities[Math.floor(Math.random()*this.possibilities.length)]
    return possibility.randomActionFor(subject)
  }

  get exampleStrings() {
    return this.possibilities.map(poss => poss.imperativeExample())
  }
}
PossibilitySet.prototype.isPossibilitySet = true
module.exports = PossibilitySet
