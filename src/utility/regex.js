function sourcify(list) {
  return list
    .filter(item => item)
    .map(item => item.constructor == RegExp ? item.source : item)
}

function autoBracket(str) {
  if(/\(.*\)/.test(str) || /\w+/.test(str))
    return str
  else
    return "(" + str + ")"
}

function concat(...operands) {
  return new RegExp(
    sourcify(operands)
      .map(autoBracket)
      .join("")
  )
}
function concatSpaced(...operands) {
  return new RegExp(
    sourcify(operands)
      .map(autoBracket)
      .join(" ")
  )
}
function or(...operands) {
  return new RegExp(
    sourcify(operands)
      .map(autoBracket)
      .join("|")
  )
}

module.exports = {
  concat: concat,
  concatSpaced: concatSpaced,
  or: or,
}
