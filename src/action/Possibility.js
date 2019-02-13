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

class Possibility {
  constructor({verb, consequence, condition}) {
    this.verb = verb // string
    this.consequence = consequence // function
    this.condition = condition // function, returns bool

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
    let params = this.actionToParams(action)
    if(params) {
      let consequences = this.consequence(...params)
      for(var i in action) {
        if(action[i].isNoumenon)
          action[i].history.push(action)
      }
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

  parseImperative(str) {
    // parse an NL string in imperative tense, return an action query
    let result = this.imperativeRegex.exec(str)

    if(result) {
      let actionQuery = result.groups
      actionQuery._verb = this.verb
      return actionQuery
    }
  }
}
module.exports = Possibility
