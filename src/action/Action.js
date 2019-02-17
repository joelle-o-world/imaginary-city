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
          return {problems:[this.phrase('negative_possible_past')]}
        else if(problems) {
          if(problems.constructor != Array)
            problems = [problems]
          problems[0] = sub(
            '_ because _', this.phrase('negative_possible_past'), problems[0])
          return {problems:problems}
        }
      }

      // call the expand function, if it exists
      var expanded = null
      if(this.possibility.expand) {
        expanded = this.possibility.expand(...params)

        if(expanded && expanded.constructor != Array)
          expanded = [expanded]
      }

      // call the consequences function, if it exists
      var consequences = null
      if(this.possibility.consequence) {
        consequences = this.possibility.consequence(...params)


        // NOTE: if the consequence returns null, that doesn't mean it failed
        if(consequences && consequences.constructor != Array)
          consequences = [consequences] // allows us to return single consequences
      }


      // mark this action as executed
      this.executed = true


      // add this Action to the history of all the noumena involved
      for(var noum of this.noumena)
        noum.history.push(this)


      return {
        action: this,
        expanded: expanded,
        consequences: consequences
      }
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
  str(tense, ctx) {
    return this.phrase(tense).str(ctx)
  }

  get subject() {
    return this.action._subject
  }
  get verb() {
    return this.action._verb
  }
  get object() {
    return this.action._object
  }
}
Action.prototype.isAction = true
module.exports = Action
