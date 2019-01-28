module.exports = {
  // classes
  Noumenon: require("./Noumenon"),
  Room: require("./rooms/Room"),
  Person: require("./people/Person"),
  Item: require("./items/Item"),

  // class groups
  rooms: require("./rooms"),
  items: require("./items"),
  buildings: require("./buildings"),
  people: require("./people"),

  // function groups
  utility: require("./utility"),
  random: require("./random"),
}
