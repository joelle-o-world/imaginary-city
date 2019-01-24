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
  }
}
