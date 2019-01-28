const CommandTemplate = require("../explorer/CommandTemplate.js")
const Explorer = require("../explorer/Explorer")
const Enviroment = require("../explorer/Enviroment")

let enviroment = new Enviroment

var game = new Explorer(enviroment)
game.addCommandTemplate("Look at _")
game.listen()
