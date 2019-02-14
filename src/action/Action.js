/*
  A wrapper class for adding meta data to an action.
*/

const verbPhrase = require('../utility/conjugate/verbPhrase')
const {sub} = require('../utility')

class Action {
  constructor(action, possibility) {
    this.action = action
    this.possibility = possibility

    this.executed = false
  }

  execute() {
    if(!this.possibility)
      throw 'cannot execute an Action that has no possibility'
    if(this.executed)
      console.warn('Re excuting action that has already been executed', this)

    // convert action into parameter list
    let params = this.possibility.actionToParams(this.action)
    // (will return null if action does not fit this possibility)

    if(params) {
      // if 'problem' function exists call it and potentially fail the execution
      if(this.possibility.problem) {
        let problems = this.possibility.problem(...params)
        if(problems === true)
          return [this.phrase('negative_possible_past')]
        else if(problems) {
          if(problems.constructor != Array)
            problems = [problems]
          console.log(problems[0])
          problems[0] = sub(
            '_ because _', this.phrase('negative_possible_past'), problems[0])
          return problems
        }
      }

      // call the consequences function
      let consequences = this.possibility.consequence(...params)

      // add this Action to the history of all the noumena involved
      for(var noum of this.noumena)
        noum.history.push(this)

      // NOTE: if the consequence returns null, that doesn't mean it failed
      if(!consequences)
        consequences = []
      if(consequences.constructor != Array)
        consequences = [consequences] // allows us to return single consequences

      if(this.possibility.returnSelfAsConsequence)
        consequences.unshift(this)

      // mark this action as executed
      this.executed = true

      return consequences
    } else
      // it failed
      throw 'execution of action failed because the it did not match its possibility'
  }

  get noumena() {
    let list = []
    for(var i in this.action) {
      if(i == '_verb') // skip the verb
        continue
      if(this.action[i].isNoumenon)
        list.push(this.action[i])
    }
    return list
  }

  phrase(tense) {
    return verbPhrase(this.action, tense)
  }
  str(tense) {
    return this.phrase(tense).str()
  }
}
Action.prototype.isAction = true
module.exports = Action
