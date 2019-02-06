const parseText = require("./parseText")

function sentencify(str) {
  let split = parseText(str)

  if(split[0] != '^')
    split.unshift('^')
  if(!(/[.!?]/).test(split[split.length-1]))
    split.push('.')

  let recombined = parseText.recombine(split)
  return recombined
}
module.exports = sentencify
