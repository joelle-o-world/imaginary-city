const readline = require("readline")
const CommandTemplate = require("./CommandTemplate")
const Enviroment = require("./Enviroment")
const confusionLog = require("./confusionLog.js")

class Explorer {
  constructor(
    enviroment, // the enviroment object
    write=console.log, // the function to pass output to
  ) {
    if(!enviroment)
      throw "Explorer requires an enviroment"
    this.commandTemplates = []
    this.enviroment = enviroment

    this.write = write // from now on call this.write to output strings
  }

  addCommand(templateString, action) {
    this.commandTemplates.push(new CommandTemplate(templateString, action))
  }

  input(str) {
    this.write("\n\n> "+str+"\n\n")
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
              this.writeln(result)
          }
          return;
        }
      }
    }
    this.writeln("Not understood.")
  //  confusionLog(str, commandsMatched)
  }

  listen() {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.prompt()
    rl.on("line", str => {
      if(str.length) {
        this.write("\n")
        this.input(str)
      } else {
        let command = this.randomCommand()
        this.writeln("(chosen random command) > "+command, "\n")
        this.input(command)
      }
      this.write('\n')
      rl.prompt()
    })
  }

  randomCommand() {
    let template = this.commandTemplates[Math.floor(Math.random()*this.commandTemplates.length)]
    let objs = this.enviroment.randomNoumena(template.nObjects)
    let obStrings = objs.map(o=>o.ref())
    let command = template.subIn(...obStrings)
    return command
  }
}
module.exports = Explorer
