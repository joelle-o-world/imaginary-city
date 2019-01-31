/*
  CommandTemplate is a class for parsing user input.
*/

class CommandTemplate {
  constructor(templateStrings, action) { // action is the function
    if(!templateStrings)
      throw "No templateStrings"
    if(templateStrings.constructor == String)
      templateStrings = [templateStrings]

    this.templateStrings = templateStrings
    this.regexs = this.templateStrings.map(
      str => new RegExp("^"+str.replace(/_/g, "(.+)") + "$", "i")
    )

    this.action = action || null
  }

  parse(str) {
    for(var i in this.regexs) {
      let reg = this.regexs[i]
      let result = reg.exec(str)
      if(!result)
        continue

      return result.slice(1)
    }
    return null
  }
}
module.exports = CommandTemplate
