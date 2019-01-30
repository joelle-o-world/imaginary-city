function sourcify(list) {
  return list
    .filter(item => item)
    .map(item => item.constructor == RegExp ? item.source : item)
}

function bracket(str) {
  return "(" + str + ")"
}
function autoBracket(str) {
  if(/^[\w ]+$/.test(str))
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
function optional(operand) {
  operand = new RegExp(operand).source
  operand = bracket(operand)
  return operand + "?"
}
function kleene(operand) {
  operand = new RegExp(operand).source
  operand = bracket(operand)
  return operand + "*"
}

function optionalConcatSpaced(stem, ...optionalAppendages) {
  stem = autoBracket(new RegExp(stem).source)
  optionalAppendages = sourcify(optionalAppendages)
    .map(a => autoBracket(a))
    .map(a => optional(" " + a))
  return concat(stem, ...optionalAppendages)
}

module.exports = {
  concat: concat,
  concatSpaced: concatSpaced,
  or: or,
  optional: optional,
  kleene: kleene,
  optionalConcatSpaced: optionalConcatSpaced,
}
