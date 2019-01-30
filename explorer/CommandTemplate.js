/*
  CommandTemplate is a class for parsing user input.
*/

class CommandTemplate {
  constructor(templateString, action) { // action is the function
    if(!templateString)
      throw "No templateString"

    this.templateString = templateString
    let regexstr = "^"+templateString.replace(/_/g, "(.+)") + "$"
    this.regex = new RegExp(regexstr, "i")

    this.action = action || null
  }

  parse(str) {
    var result = this.regex.exec(str)
    if(!result)
      return null

    return result.slice(1)
  }
}
module.exports = CommandTemplate
