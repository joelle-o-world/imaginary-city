const readline = require("readline")
const CommandTemplate = require("./CommandTemplate")
const Enviroment = require("./Enviroment")
const confusionLog = require("./confusionLog.js")

class Explorer {
  constructor(enviroment) {
    if(!enviroment)
      throw "Explorer requires an enviroment"
    this.commandTemplates = []
    this.enviroment = enviroment
  }

  addCommand(templateString, action) {
    this.commandTemplates.push(new CommandTemplate(templateString, action))
  }

  input(str) {
    let commandsMatched = 0
    for(var i in this.commandTemplates) {
      let command = this.commandTemplates[i]
      let objectStrings = command.parse(str)
      if(objectStrings) {
        ++commandsMatched
        let noumena = objectStrings.map(str => this.enviroment.find(str))
        if(!noumena.includes(null) && !noumena.includes(undefined)) {
          // found a match
          if(command.action) {
            let result = command.action.apply(this, noumena)
            if(result && result.constructor == String)
              console.log(result)
          }
          return;
        }
      }
    }
    console.log("Not understood.")
    confusionLog(str, commandsMatched)
  }

  listen() {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.prompt()
    rl.on("line", str => {
      console.log(" ")
      this.input(str)
      console.log(" ")
      rl.prompt()
    })
  }
}
module.exports = Explorer
