/*
  CommandTemplate is a class for parsing user input.
*/

const placeholderReg = /_/g

class CommandTemplate {
  constructor(templateStrings, action) { // action is the function
    if(!templateStrings)
      throw "No templateStrings"
    if(templateStrings.constructor == String)
      templateStrings = [templateStrings]

    let nObjects = Math.max(...templateStrings.map(
      str => {
        let matches = str.match(placeholderReg)
        return matches ? matches.length : 0
      }
    ))
    this.nObjects = nObjects

    this.templateStrings = templateStrings
    this.regexs = this.templateStrings.map(
      str => new RegExp("^"+str.replace(placeholderReg, "(.+)") + "$", "i")
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

  subIn(...subs) {
    // return a string with the placeholders replaced by the arguments
    let str = this.templateStrings[Math.floor(Math.random()*this.templateStrings.length)]
    let bits = str.split(placeholderReg)
    let out = bits[0]
    for(var i=1; i<bits.length; i++)
      out += subs[i-1] + bits[i]
    return out
  }
}
module.exports = CommandTemplate
