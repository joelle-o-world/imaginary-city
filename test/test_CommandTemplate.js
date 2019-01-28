const CommandTemplate = require("../explorer/CommandTemplate.js")
const Explorer = require("../explorer/Explorer")

var game = new Explorer()
game.addCommandTemplate("Look at _")
game.listen()
