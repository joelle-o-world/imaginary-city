/*
  Noumenon is the super class for everything which exists in the world.
*/

const random = require("./random")

class Noumenon {

  // Suspended Initialisation
    /* This allows a Noumenon to delay the generation of properties until they are needed. This is done by adding temporary getter/setters for the property which self delete when called, replacing themselves with the generated value. */
  __suspendInit__(propertyName, func) {
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
  getDescriptor(preposition) {
    var list = this.descriptorFunctions[preposition]
    if(list && list.length)
      return list[Math.floor(Math.random()*list.length)](this)
    else
      return null
  }
  getDescriptiveReference({
    article=Math.random() < 0.5 ? "the" : "a",
    numberOfAdjectives = Math.floor(Math.random()*3),
    numberOfAdditionalPrepositions = Math.floor(Math.random()*2)
  }={}) {

    // choose a noun
    var noun = this.nouns[Math.floor(Math.random()*this.nouns.length)]
    if(noun.constructor == Function)
      noun = noun(this)

    // check if proper noun
    if(noun[0] == noun[0].toUpperCase())
      article = null

    // choose adjectives
    if(this.descriptorFunctions["adj"]) {
      var adjectives = this.descriptorFunctions["adj"]
        .sort(() => Math.random()*2-1)
        .slice(0, numberOfAdjectives)
        .map(adjFunc => adjFunc(this))
    } else
      var adjectives = []
    adjectives = adjectives.filter(adj => adj)

    // additional prepositions

    var options = Object.keys(this.descriptorFunctions)
      .filter(key => key != "adj")
    var clauses = []
    for(var i=0; i<numberOfAdditionalPrepositions; i++) {
      var prep = options[Math.floor(Math.random()*options.length)]
      var descriptor = this.getDescriptor(prep)
      var clause = prep + " " + descriptor
      if(prep && descriptor)
        clauses.push(clause)
    }


    // return the finished bit
    var output = []
    if(article)
      output.push(article)
    for(var i in adjectives)
      output.push(adjectives[i])
    output.push(noun)
    for(var i in clauses)
      output.push(clauses[i])
    return output.join(" ")
  }
}
Noumenon.prototype.isNoumenon = true

Noumenon.prototype.nouns = ["thing"]
Noumenon.prototype.addNouns = function(...nouns) {
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
