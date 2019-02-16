const Action = require("./Action")

function* recursivelyExecute(stuff, pset) {
  // stuff is an array containing actions, strings and a whole load of stuff
  // pset is the probability set against which to interpret the stuff
  if(!stuff)
    throw 'recursivelyExecute expects something to execute'
  if(!pset)
    throw 'theres no point calling recursivelyExecute without a PossibilitySet'


  for(let thing of stuff) {
    if(!thing) // skip null values
      continue

    if(thing.isSubstitution)
      yield thing

    if(this.constructor == String)
      yield thing

    if(typeof thing == 'object' && thing._verb)
      // convert rough actions to ready actions
      thing = new Action(thing)

    if(thing.isAction) {
      let action = thing
      if(!action.possibility)
        action.possibility = pset.findMatch(action)

      if(action.possibility) {
        // action has possibility so execute
        let {expanded, consequences, problems} = action.execute()

        if(problems) {
          for(let problem of recursivelyExecute(problems, pset))
            yield problem
          continue
        }

        if(expanded)
          for(let o of recursivelyExecute(expanded, pset))
            yield o
        else yield action

        if(consequences)
          for(let consequence of recursivelyExecute(consequences, pset))
            yield consequence

      } else {
        // action has no possibility so yield without executing
        yield action
      }
    }
  }
}
module.exports = recursivelyExecute
