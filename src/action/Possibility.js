 /*
  This class is so abstract I'm having a hard time working out how to explain
  it. In short, represents a template for a sentence (abstracted from tense, and
  from the objects involved), along with the consequence function and the
  condition function. The consequence function takes an action which fits this
  template/possibility and makes it true (if it is unable to, return null.)
  The condition function takes a given action and finds out whether it is true.
*/

const getParams = require("@captemulation/get-parameter-names")
const verbPhrase = require("../utility/conjugate/verbPhrase")
const interpretActionQuery = require('./interpretActionQuery')
const Action = require('./Action')

class Possibility {
  constructor({verb, consequence, problem}) {
    this.verb = verb // string
    this.consequence = consequence // function
    this.problem = problem // function, returns bool

    this.params = getParams(this.consequence).map(param => param.toLowerCase())

    this.imperativeRegex = this.getImperateRegex()
  }

  actionToParams(action) {
    // convert an action into an ordered list of params

    // return failure if the verbs don't match
    if(action._verb != this.verb)
      return null

    let list = new Array(this.params.length).fill(null)
    for(var param in action) {
      // NOTE: if a param is null, thats fine, it is up to the consequence/
      //       condition functions to handle this case. The real problem is if
      //       the action includes parameters which the possibility hasn't heard
      //       of.

      if(param == '_verb') // skip '_verb'
        continue

      let i = this.params.indexOf(param)

      // return failure if the param is not in the possibilities list.
      if(i == -1)
        return null

      list[i] = action[param]
    }

    return list
  }

  checkTruth(action) {
    let params = this.actionToParams(action)

    if(params)
      return this.condition(...params)
    else return false
  }

  execute(action) {
    // execute an action

    // convert action into parameter list
    let params = this.actionToParams(action)
    // (will return null if action does not fit this possibility)

    if(params) {
      // if check function exists call it and potentially fail the execution
      if(this.check && !this.check(action))
        return null // fail iff check function exists AND it fails

      // call the consequences function
      let consequences = this.consequence(...params)

      // NOTE: if the consequence returns null, thats doesn't mean it failed
      if(!consequences)
        consequences = []
      consequences.unshift(action)

      return consequences
    }
  }

  imperativeCommandString() {
    let action = {_verb: this.verb}
    for(var i in this.params) {
      action[this.params[i]] = '_'
    }
    return verbPhrase(action, 'imperative').str()
  }

  getImperateRegex() {
    let action = {_verb: this.verb}
    for(var i in this.params) {
      action[this.params[i]] = '(?<'+this.params[i]+'>.+)'
    }
    return new RegExp('^'+verbPhrase(action, 'imperative').str()+'$')
  }

  parseImperative(str, subject) {
    // parse an NL string in imperative tense, return an action
    if(!subject)
      throw 'parseImperative expects a subject'

    let result = this.imperativeRegex.exec(str)

    if(!result)
      return null

    let actionQuery = result.groups
    actionQuery._verb = this.verb

    // interpret the action query using the subject as a starting point
    let action = interpretActionQuery(actionQuery, subject)
    if(!action)
      return null // if that doesn't work we've failed :(

    action._subject = subject

    return new Action(action, this)
  }
}
module.exports = Possibility
