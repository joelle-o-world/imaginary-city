/*
  Substitution is a class for formatting sentence involving zero or more
  noumena. It can be used to avoid generating the noun phrases until the program
  is sure that they will be needed. A quick function Substitution.substitution
  can be used to format a one off string.
*/

const {randexp} = require("randexp")
const placeholderRegex = /_\w*/g
const {autoBracket, kleenePoliteList} = require("./regex")
const politeList = require('./politeList')


class Substitution { // sometimes abbreviated Sub
  constructor(templateStr, ...noumena) {
    this.template = templateStr
    this.noumena = noumena
  }

  getString(ctx) {
    let toSubIn = this.noumena.map(o => {
      if(o == null || o == undefined)
        return null
      else if(o.isNoumenon)
        return o.ref(ctx)
      else if(o.constructor == String)
        return o
      else if(o.construtor == RegExp)
        return randexp(o)
      else if(o.constructor == Number)
        return o.toString()
      else if(o.isSubstitution)
        return o.getString(ctx)
      else if(o.isAction)
        return o.str()
      else if(o.constructor == Array)
        return o.length ? Substitution.politeList(o).str(ctx) : 'nothing'
      else {
        console.warn("Couldn't interpret substitution value:", o, this)
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
    let toSubIn = this.noumena.map(formatRegex)

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

  static politeList(items) {
    let placeholders = items.map(item => '_')
    let template = politeList(placeholders)
    return new Substitution(template, ...items)
  }

  static concat(...toConcat) {
    // concatenate many substitutions and strings into a new substitution
    let strs = []
    let noumena = []

    for(let bit of toConcat) {
      if(bit.constructor == String)
        strs.push(bit)
      if(bit.constructor == Substitution) {
        strs.push(bit.template)
        noumena = noumena.concat(bit.noumena)
      }
    }

    let template = strs.join('')
    console.log(template, noumena)
    return new Substitution(template, ...noumena)
  }
}

Substitution.prototype.isSubstitution = true
Substitution.placeholderRegex = placeholderRegex
module.exports = Substitution

const formatRegex = o => {
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
  else if(o.constructor == Array) {
    //throw "cannot (yet) generate regex from substitution containing an array"
    return kleenePoliteList(...o.map(formatRegex)).source
  } else if(o.isSubstitution) {
    let regex = o.getRegex()
    if(regex && regex.constructor == RegExp)
      return autoBracket(regex.source)
    else return null
  } else {
    console.warn("Couldn't interpret substitution value:", o)
    return "???"
  }
}
