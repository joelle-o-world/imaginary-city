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
}
Noumenon.prototype.isNoumenon = true
module.exports = Noumenon
