const {contractBySubject} = require('../utility/conjugate/verbPhrase')

function contractContractables(stuff, tense) {
  // Given an array of anything, group together consequetive actions which can
  // be contracted.
  let out = []
  let currentGroup = null

  for(var i=0; i<stuff.length; i++) {
    let A = stuff[i]

    if(A && A.isAction) {
      let group = [A.action]
      for(var j=i+1; j<stuff.length; j++) {
        let B = stuff[j]
        if(B && B.isAction && B.subject == A.subject)
          group.push(B.action)
        else
          break
      }
      if(group.length == 1)
        out.push(A)
      else {
        out.push(contractBySubject(group, tense))
        i = j-1
      }
    } else
      out.push(A)
  }

  return out
}
module.exports = contractContractables
