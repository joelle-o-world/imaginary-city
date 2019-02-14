/*
  Language utility. A set of tools for quickly formatting english.
*/

const Substitution = require("./Substitution")

module.exports = {
  politeList: function politeList(list) {
    if(list.length == 1)
      return list[0]
    else {
      return list.slice(0, list.length-1).join(", ") + " and " + list[list.length-1]
    }
  },

  possessive: function possessive(str) {
    return str + "'s"
  },

  quantify: function quantify(n, noun) {
    if(n == 1)
      return "one "+noun
    if(n == 0)
      return "no "+noun+"s"
    if(n > 1)
      return n + " " + noun + "s"
  },

  sentencify: require('./sentencify.js'),

  regex: require("./regex"),

  Substitution: Substitution,
  Sub: Substitution, // quick alias
  sub: (...args) => new Substitution(...args),
}
