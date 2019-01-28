const readline = require("readline")
const CommandTemplate = require("./CommandTemplate")

class Explorer {
  constructor() {
    this.commandTemplates = []
  }

  addCommandTemplate(templateString) {
    this.commandTemplates.push(new CommandTemplate(templateString))
  }

  input(str) {
    for(var i in this.commandTemplates) {
      var objectStrings = this.commandTemplates[i].parse(str)
      if(objectStrings){
        console.log("Understood!", objectStrings)
        return;
      }
    }
    console.log("Not understood.")
  }

  listen() {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.prompt()
    rl.on("line", str => {
      this.input(str)
      rl.prompt()
    })
  }
}
module.exports = Explorer
