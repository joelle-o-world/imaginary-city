/*
  A wrapper class for adding meta data to an action.
*/

const verbPhrase = require('../utility/conjugate/verbPhrase')

class Action {
  constructor(action, possibility) {
    this.action = action
    this.possibility = possibility

    this.executed = false
  }

  execute() {
    if(!this.possibility)
      throw 'cannot execute an Action that has no possibility'

    // convert action into parameter list
    let params = this.possibility.actionToParams(this.action)
    // (will return null if action does not fit this possibility)

    if(params) {
      // if 'problem' function exists call it and potentially fail the execution
      if(this.possibility.problem) {
        let problem = this.possibility.problem(...params)
        if(problem)
          return [problem]
      }

      // call the consequences function
      let consequences = this.possibility.consequence(...params)

      // add this Action to the history of all the noumena involved
      for(var noum of this.noumena)
        noum.history.push(this)

      // NOTE: if the consequence returns null, that doesn't mean it failed
      if(!consequences)
        consequences = []
      consequences.unshift(this)

      // mark this action as executed
      this.executed = true

      return consequences
    } else
      // it failed
      throw 'execution of action failed because the action did not match its possibility'
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

  str(tense) {
    return verbPhrase(this.action, tense).str()
  }
}
Action.prototype.isAction = true
module.exports = Action
