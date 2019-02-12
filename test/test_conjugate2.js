const conjugate = require("../src/utility/conjugate/conjugate")

const irregularVerbs = Object.keys(require("../src/utility/conjugate/irregularConjugations"))


let verbs = [...irregularVerbs]
let pronouns = [
  'Inf:','I', 'you', 'he', 'we', 'you', 'they', 'she is', 'he has', "Jeremiah",
  'regex:'
]

for(var i in verbs) {
  let list = []
  for(var form=0; form <=10 ; form++) {
    list.push(pronouns[form] +' '+ conjugate(verbs[i], form))
  }
  console.log(list.join("\n"), "\n")
}
