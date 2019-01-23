/*
  Noumenon is the super class for everything which exists in the world.
*/

class Noumenon {

  // Suspended Initialisation
    /* This allows a Noumenon to delay the generation of properties until they are needed. This is done by adding temporary getter/setters for the property which self delete when called, replacing themselves with the generated value. */
  __suspendInit__(propertyName, func) {
    this.__defineGetter__(propertyName, function() {
      delete this[propertyName]
      this[propertyName] = func.apply(this)
      return this[propertyName]
    })
    this.__defineSetter__(propertyName, function(val) {
      delete this[propertyName]
      this[propertyName] = val
      return this[propertyName]
    })
  }


  // Natural Language Descriptions
  describe() {
    // make a standalone sentence/clause describing this Noumenon
    if(this.describeFunctions && this.describeFunctions.length) {
      var func = this.describeFunctions[Math.floor(Math.random()*this.describeFunctions.length)]
      return func(this)
    } else
      return null
  }
  descriptiveReference() {
    // make a noun phrase to be used in another sentence which reveals details about this Noumenon
    if(this.descriptiveReferenceFunctions && this.descriptiveReferenceFunctions.length) {
      var func = this.descriptiveReferenceFunctions[Math.floor(this.descriptiveReferenceFunctions.length * Math.random())]
      return func(this)
    } else
      return "something indescribable"
  }
}
Noumenon.prototype.isNoumenon = true

Noumenon.prototype.describeFunctions = []
Noumenon.prototype.descriptiveReferenceFunctions = []
Noumenon.prototype.addDescriptiveReferences = function(...functions) {
  // safeley add functions for generating descriptive references.
  // NOTE: call on the prototype
  this.descriptiveReferenceFunctions = this.descriptiveReferenceFunctions.concat(functions)
}

module.exports = Noumenon
