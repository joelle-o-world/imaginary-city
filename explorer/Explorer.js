const readline = require("readline")
const CommandTemplate = require("./CommandTemplate")
const Enviroment = require("./Enviroment")
const confusionLog = require("./confusionLog.js")
const sentencify = require("./sentencify")

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
    this.newline()
    if(str.length == 0) {
      let command = this.randomCommand()
      this.newline()
      this.write("(chosen random command)")
      str = command
    }

    this.newline()
    //this.write("> ")
    this.writeSentence(str)
    this.newline(2)
    let strNoPunc = str.replace(/[.,?!]/g, "") // string without punctuation
    let commandsMatched = 0

    // test each command template for a match
    for(var i in this.commandTemplates) {
      let command = this.commandTemplates[i]
      let objectStrings = command.parse(strNoPunc)
      if(objectStrings) {
        ++commandsMatched
        let noumena = objectStrings.map(str => this.enviroment.find(str))
        if(!noumena.includes(null) && !noumena.includes(undefined)) {
          // found a match
          if(command.action) {
            // execute the first command which matches both template and objects
            let result = command.action.apply(this, noumena)
            if(result && result.constructor == String)
              this.writeParagraph(result)
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

      this.write("\n")
      this.input(str)

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

  // printing
  writeln(...str) {
    this.write(...str)
    this.newline()
  }
  writeSentence(...str) {
    let fullStr = str.join(" ")
    this.write(sentencify(fullStr) + ' ')
  }
  writeParagraph(...str) {
    this.newline()
    this.writeSentence(...str)
    this.newline()
  }
  newline(n=1) {
    for(var i=0; i<n; i++)
      this.write("\n")
  }
}
module.exports = Explorer
