/*
  Substitution is a class for formatting sentence involving zero or more
  noumena. It can be used to avoid generating the noun phrases until the program
  is sure that they will be needed. A quick function Substitution.substitution
  can be used to format a one off string.
*/

const {randexp} = require("randexp")
const placeholderRegex = /_/g

class Substitution { // sometimes abbreviated Sub
  constructor(templateStr, ...noumena) {
    this.template = templateStr
    this.noumena = noumena
  }

  getString(descriptionCtx) {
    let toSubIn = this.noumena.map(o => {
      if(o.isNoumenon)
        return o.ref(descriptionCtx)
      else if(o.constructor == String)
        return o
      else if(o.construtor == RegExp)
        return randexp(o)
      else {
        console.warn("Couldn't interpret substitution value:", o)
        return "???"
      }
    })

    return this.subIn(...toSubIn)
  }
  getRegex() {
    let toSubIn = this.noumena.map(o => {
      if(o.isNoumenon)
        return o.refRegex()
      else if(o.constructor == String || o.constructor == RegExp)
        return o
      else {
        console.warn("Couldn't interpret substitution value:", o)
        return "???"
      }
    })
    return this.subIn(...toSubIn)
  }

  subIn(...subs) {
    let bits = this.template.split(placeholderRegex)
    let out = bits[0]
    for(var i=1; i<bits.length; i++)
      out += subs[i-1] + bits[i]
    return out
  }

  static substitution(templateStr, ...noumena) {
    let ctx
    if(!noumena[noumena.length-1].isNoumenon)
      ctx = noumena.pop()
    else
      ctx = {}

    return new Substitution(templateStr, ...noumena).getString(ctx)
  }
}

Substitution.prototype.isSubstitution = true
module.exports = Substitution
