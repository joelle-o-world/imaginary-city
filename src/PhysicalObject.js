/*
  Sub-class of Noumenon. Base class for anything that has a material presence
  in the world.

  Base classes:
    - Person
    - Item
    - Door
    - Floor

  not Room.

  The responsibility of this class is to provide a framework for the way objects
  relate to one another. Namely, one object on top of another / inside another.

*/

const {Sub} = require("./utility")

const Noumenon = require("./Noumenon")

class PhysicalObject extends Noumenon {
  constructor() {
    super()
    this.location = null

    this.locating = [] // array of objects for which this object is the location)
  }

  removeSelfFromLocation() {
    // extract
    if(this._location) {
      if(this.locationType == 'room')
        // room is a special case because Room does not inherit from PhysicalObject
        this._location.removeContent(this)
      else
        this._location.locating.splice(this._location.locating.indexOf(this),1)
    }
    this.locationType = 'null'
    this._location = null
  }

  setLocation(location, locationType) {
    if(!location) {
      this.removeSelfFromLocation()
      return
    }

    if(!locationType)
      throw "Cannot set location of PhysicalObject without locationType"

    if(location.isRoom) {
      this.removeSelfFromLocation()
      this.locationType = 'room'
      this._location = location
      location.contents.push(this)
      return
    }

    if(location.canBeLocationType.includes(locationType)
      && this.canHaveLocationType.includes(locationType)) {
      this.removeSelfFromLocation()
      this.locationType = locationType
      this._location = location
      this._location.locating.push(this)
      return
    }

    console.warn('setLocation was unsuccessful')
  }

  get location() {
    return this._location
  }
  set location(location) {
    if(!location)
      return this.setLocation(null, 'null')

    if(location.isRoom)
      return this.setLocation(location, 'room')

    for(let type of this.canHaveLocationType)
      if(location.canBeLocationType.includes(type))
        return this.setLocation(location, type)

    console.warn('set location failed')
  }

  get room() {
    // recursively find the room which this object is in
    if(this.locationType == 'room')
      return this._location
    else if(this._location)
      return this._location.room
    else return null
  }
  set room(room) {
    // set the location of this object to a Room
    this.setLocation(room, 'room')
  }

  get surface() {
    return this.locationType == 'surface' ? this._location : null
  }
  set surface(surface) {
    return this.setLocation(surface, 'surface')
  }
  get supporting() {
    return this.locating.filter(item => item.locationType == 'surface')
  }

  get container() {
    return this.locationType == 'container' ? this._location : null
  }
  set container(container) {
    return this.setLocation(container, 'container')
  }
  get containing() {
    return this.locating.filter(item => item.locationType == 'container')
  }

  get neighbours() {
    // return a list of items which share the same location, exclude this

    // if location is surface, return all objects on the surface except this
    if(this.locationType == 'room')
      return this._location.contents.filter(o => o != this)
    if(this._location)
      return this._location.locating.filter(o => o != this)

    // otherwise return empty array
    else
      return []
  }
}
PhysicalObject.prototype.isPhysicalObject = true
PhysicalObject.prototype.canBeLocationType = ['container', 'surface']
PhysicalObject.prototype.canHaveLocationType = ['container', 'surface', 'room']

PhysicalObject.prototype.addDescriptorFunctions({
  on: [
    o => o.surface,
  ],
  in: [
    o => o.container,
    //(o, ctx) => o.room ? o.room.refRegex(ctx) : null, // this line causes a stack overflow
  ]
})
PhysicalObject.prototype.addDescription(
  o => {
    if(o.locationType == 'room' || o.locationType == 'container')
      return {_subject:o, _verb:'be', in:o.location}

  },
  o => (o.locationType == 'surface' ?
       {_subject: o, _verb:'be', on:o.location} : null),

  o => o.neighbours.length ? {_subject:o, _verb:'be', 'next to':o.neighbours} : null,

  o => o.supporting.length ? new Sub('On top of _ there is _', o, o.supporting) : null,
  o => o.containing.length ? new Sub('inside _ there is _', o, o.containing) : null,
)

module.exports = PhysicalObject
