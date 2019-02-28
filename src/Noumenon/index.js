let Noumenon = require("./Noumenon.js")
require("./regex")(Noumenon)
require("./getDescriptiveReference")(Noumenon)
require('./makeSound')(Noumenon)
module.exports = Noumenon
