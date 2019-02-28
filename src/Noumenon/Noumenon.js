/*
  Noumenon is the super class for everything which exists in the world.
*/

const EventEmitter = require('events')
const random = require("../random")
const utility = require("../utility")
const regOp = utility.regex // regular expression operations
const {randexp} = require("randexp")
const interpretSpecialArray = require("./interpretSpecialArray")
const specarr = require("../utility/specarr")

class Noumenon extends EventEmitter{

  constructor() {
    super()
    this.history = [] // history of all actions involving this noumenon
  }

  // Suspended Initialisation
    /* This allows a Noumenon to delay the generation of properties until they
    are needed. This is done by adding temporary getter/setters for the
    property which self delete when called, replacing themselves with the
    generated value. */
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


  // Natural Language Descriptions
  matchesRef(str) {
    // check if a natural lang ref matches this noumena
    return new RegExp("^"+this.refRegex().source+"$", "i").test(str)
  }

  // Regular expression functions
  get noun() {
    return randexp(this.nounRegex())
  }
  set noun(noun) {
    this.nouns = [noun]
  }

  adjs(ctx) {
    // returns a list of all adjectives
    if(!this.descriptorFunctions.adj)
      return null

    return interpretSpecialArray(this, this.descriptorFunctions.adj, ctx)
  }

  get hasProperNouns() {
    return this.properNouns && this.properNouns.length
  }

  describe() {
    // compose a sentence describing this noumenon
    return specarr.random(this, this.descriptions)
  }
  describeAll() {
    return specarr.expand(this, this.descriptions)
  }
}
Noumenon.prototype.isNoumenon = true

Noumenon.prototype.nouns = ["thing"] // special array
Noumenon.prototype.addNouns = function(...nouns) {
  // NOTE: functional nouns must be deterministic
  this.nouns = this.nouns.concat(nouns)
  return this.nouns
}

Noumenon.prototype.descriptorFunctions = {} // each value is a special array
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

Noumenon.prototype.descriptions = [] // special array
Noumenon.prototype.addDescription = function(...functions) {
  this.descriptions = this.descriptions.concat(functions)
}

module.exports = Noumenon
