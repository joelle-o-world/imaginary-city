/*
  Substitution is a class for formatting sentence involving zero or more
  noumena. It can be used to avoid generating the noun phrases until the program
  is sure that they will be needed. A quick function Substitution.substitution
  can be used to format a one off string.
*/

const {randexp} = require("randexp")
const placeholderRegex = /_\w*/g
const {autoBracket} = require("./regex")

class Substitution { // sometimes abbreviated Sub
  constructor(templateStr, ...noumena) {
    this.template = templateStr
    this.noumena = noumena
  }

  getString(descriptionCtx) {
    let toSubIn = this.noumena.map(o => {
      if(o == null || o == undefined)
        return null
      else if(o.isNoumenon)
        return o.ref(descriptionCtx)
      else if(o.constructor == String)
        return o
      else if(o.construtor == RegExp)
        return randexp(o)
      else if(o.constructor == Number)
        return o.toString()
      else if(o.isSubstitution)
        return o.getString(descriptionCtx)
      else {
        console.warn("Couldn't interpret substitution value:", o)
        return "???"
      }
    })

    if(toSubIn.includes(null))
      return null

    return this.subIn(...toSubIn)
  }
  str(ctx) {
    // alias for getString
    return this.getString(ctx)
  }
  getRegex() {
    let toSubIn = this.noumena.map(o => {
      if(o == null || o == undefined)
        return o
      else if(o.isNoumenon)
        return o.refRegex().source
      else if(o.constructor == String)
        return o
      else if(o.constructor == RegExp)
        return autoBracket(o.source)
      else if(o.constructor == Number)
        return o.toString()
      else if(o.isSubstitution) {
        let regex = o.getRegex()
        if(regex && regex.constructor == RegExp)
          return autoBracket(regex.source)
        else return null
      } else {
        console.warn("Couldn't interpret substitution value:", o)
        return "???"
      }
    })

    if(toSubIn.includes(null))
      return null

    return new RegExp(this.subIn(...toSubIn))
  }

  subIn(...subs) {
    let bits = this.template.split(placeholderRegex)
    let out = bits[0]
    for(var i=1; i<bits.length; i++)
      out += subs[i-1] + bits[i]
    return out
  }

  static substitute(templateStr, ...noumena) {
    let ctx
    if(!noumena[noumena.length-1].isNoumenon)
      ctx = noumena.pop()
    else
      ctx = {}

    return new Substitution(templateStr, ...noumena).getString(ctx)
  }
}

Substitution.prototype.isSubstitution = true
Substitution.placeholderRegex = placeholderRegex
module.exports = Substitution
