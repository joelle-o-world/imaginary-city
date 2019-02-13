const {firstMatch} = require("../searchNoumena")

function interpretActionQuery(action, startingPoint) {
  // replace the noun-phrase-strings in an action query with noumena
  // return null if one noun-phrase can't be matched with a noumenon

  action = Object.assign({}, action)

  for(var key in action) {
    if(key == '_verb') // don't interpret the verb!
      continue

    let nounStr = action[key]
    let noumenon = firstMatch(nounStr, startingPoint)
    if(noumenon)
      action[key] = noumenon
    else
      return null // if no match, the whole interpretation fails
  }

  return action
}
module.exports = interpretActionQuery
