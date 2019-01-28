/*
  Language utility. A set of tools for quickly formatting english.
*/

module.exports = {
  printList: function printList(list) {
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
}
