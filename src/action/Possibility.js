 /*
  This class is so abstract I'm having a hard time working out how to explain
  it. In short, represents a template for a sentence (abstracted from tense, and
  from the objects involved), along with the consequence function and the
  condition function. The consequence function takes an action which fits this
  template/possibility and makes it true (if it is unable to, return null.)
  The condition function takes a given action and finds out whether it is true.



  Problem:      The problem function checks for problems before executing an
                action. If there are none it returns null and the action
                proceeeds. Otherwise, it returns an object or array of objects
                destined for output, these will be interpreted in the same way
                that the consequence function's return value would be.


  Consequences: The consequence function implements an action. For example,
                suppose the action is 'john goes to the kitchen', the
                consequence function will set john's location to 'the kitchen'.
                The second purpose of the consequence function is to return a
                set of objects which are triggered as a result of an action.
                Return values:
                  - null, meaning take no furthur action.
                  - a single object*
                  - an array of objects*
                *the objects may be strings, substitutions or Actions (both
                rough and action objects)
*/

const getParams = require("@captemulation/get-parameter-names")
const verbPhrase = require("../utility/conjugate/verbPhrase")
const interpretActionQuery = require('./interpretActionQuery')
const Action = require('./Action')

class Possibility {
  constructor({
    params, verb, consequence, problem, expand
  }) {
    this.verb = verb // string
    this.expand = expand
    this.consequence = consequence // function
    this.problem = problem // function, returns bool

    this.params = params || getParams(this.consequence||this.expand||this.problem).map(param => param.toLowerCase())
    // NOTE: 'in' is a reserved word so cannot be a function argument. The
    //        solution was to use 'IN' and convert all params to lower case.

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
      //       problem functions to handle this case. The real problem is if
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

    let actionQuery = result.groups || {}
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
