const randomName = require("random-name")

const pos = require('./pos') // parts of speech

module.exports = {
  buildingMaterial: require("./buildingMaterial"),
  color: require("./color.js"),
  flooring: require("./flooring.js"),
  firstName: randomName.first,
  surname: randomName.last,
  title: require("./title.js"),
  material: require("./material.js"),

  ...pos,
}
