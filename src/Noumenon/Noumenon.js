/*
  Noumenon is the super class for everything which exists in the world.
*/

const random = require("../random")
const utility = require("../utility")
const regOp = utility.regex // regular expression operations
const {randexp} = require("randexp")
const interpretSpecialArray = require("./interpretSpecialArray")

class Noumenon {

  // Suspended Initialisation
    /* This allows a Noumenon to delay the generation of properties until they are needed. This is done by adding temporary getter/setters for the property which self delete when called, replacing themselves with the generated value. */
  __suspendInit__(propertyName, func) {
    delete this[propertyName]
    if(!func && random[propertyName])
      func = random[propertyName]
    if(!func)
      throw "no function defined for " + propertyName
    this.__defineGetter__(propertyName, function() {
      delete this[propertyName]
      this[propertyName] = func.call(this)
      return this[propertyName]
    })
    this.__defineSetter__(propertyName, function(val) {
      delete this[propertyName]
      this[propertyName] = val
      return this[propertyName]
    })
  }

  matchesRef(str) {
    // check if a natural lang ref matches this noumena
    return new RegExp("^"+this.refRegex().source+"$", "i").test(str)
  }

  // Natural Language Descriptions
  getDescriptiveReference(ctx) {
    // return a noun phrase which refers to this noumenon
    let reg = this.refRegex(ctx)
    let ret = randexp(reg)
    return ret
  }
  ref(ctx) {
    // quick alias for get getDescriptiveReference
    return this.getDescriptiveReference(ctx)
  }

  // Regular expression functions
  nounRegex(ctx) { // noun RegExp
    return regOp.or(...interpretSpecialArray(this, this.nouns, ctx))
  }
  get noun() {
    return randexp(this.nounRegex())
  }
  set noun(noun) {
    this.nouns = [noun]
  }

  prepositionClauseRegex(ctx) {
    let list = []
    for(var i in this.descriptorFunctions) {
      if(i == "adj")
        continue
      let descriptors = interpretSpecialArray(this, this.descriptorFunctions[i], ctx)
      if(descriptors.length) {
        let clauseRegex = regOp.concatSpaced(
          i,
          regOp.or(...descriptors)
        )
        list.push(clauseRegex)
      }
    }

    if(list.length)
      return regOp.or(...list)
    else return null
  }

  adjs(ctx) {
    if(!this.descriptorFunctions.adj)
      return null

    return interpretSpecialArray(this, this.descriptorFunctions.adj, ctx)
  }

  properNounRegex(ctx) {
    if(!this.properNouns || this.properNouns.length == 0)
      return null
    return regOp.or(
      ...interpretSpecialArray(this, this.properNouns, ctx)
    )
  }

  refRegex(ctx) {
    // article
    let reg = /the|a/

    // adjectives
    let adjs = this.adjs(ctx)
    if(adjs && adjs.length)
      reg = regOp.optionalConcatSpaced(
        reg,
        ...adjs,
      )
    // noun
    reg = regOp.concatSpaced(
      reg,
      this.nounRegex(ctx),
    )

    // preposition clauses
    let prepRegex = this.prepositionClauseRegex(ctx)
    if(prepRegex)
      reg = regOp.optionalConcatSpaced(
        reg,
        prepRegex
      )

    // or just use a proper noun
    let properNounRegex = this.properNounRegex(ctx)
    if(properNounRegex) {
      reg = regOp.or(
        reg,
        properNounRegex
      )
    }

    return reg
  }
}
Noumenon.prototype.isNoumenon = true

Noumenon.prototype.nouns = ["thing"]
Noumenon.prototype.addNouns = function(...nouns) {
  // NOTE: functional nouns must be deterministic
  this.nouns = this.nouns.concat(nouns)
  return this.nouns
}

Noumenon.prototype.descriptorFunctions = {}
Noumenon.prototype.addDescriptorFunctions = function(functionArraysByPreposition={}) {
  // NOTE: call on prototype
  var newfunctions = Object.assign({}, this.descriptorFunctions)
  for(var preposition in functionArraysByPreposition) {
    if(!newfunctions[preposition])
      newfunctions[preposition] = []
    newfunctions[preposition] = newfunctions[preposition].concat(functionArraysByPreposition[preposition])
  }
  this.descriptorFunctions = newfunctions
}

module.exports = Noumenon
