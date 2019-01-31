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

const Noumenon = require("./Noumenon")

class PhysicalObject extends Noumenon {
  constructor() {
    super()
    this.location = null

    this.canRestOnSurface = true      // bool, can this object sit on top of something
    this.isSurface = false    // bool, can other objects be placed on top of this object
    this.isContainer = false  // bool, can other objects be placed inside of this object

    this.containing = [] // list of objects contained inside this object
    this.supporting = [] // list of objects resting on the surface of this object
  }

  removeSelfFromLocation() {
    // extract
    if(this._location) {
      let loc = this._location
      console.log(this.locationType, this.noun)
      switch(this.locationType) {

        case "room":
          loc.removeContent(this)
          break;

        case "surface":
          if(loc.supporting.includes(this))
            loc.supporting.splice(loc.supporting.indexOf(this), 1)
          break;

        case "container":
          if(loc.containing.includes(this))
            loc.containing.splice(loc.containing.indexOf(this), 1)
          break;

        case "null":
          break;

        default:
          console.warn("Strange locationType:", this.locationType);
      }
    }
    this.locationType = 'null'
    this._location = null
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
    this.removeSelfFromLocation()
    if(room.isRoom) {
      this.locationType = 'room'
      this._location = room
      room.contents.push(this)
    }
  }

  get container() {
    // recursively find the container this object is in
    if(this.locationType == 'container')
      return this._location
    else if(this._location)
      return this._location.container
    else return null
  }
  set container(container) {
    // set the location of this object to a container
    this.removeSelfFromLocation()
    if(container.isContainer) {
      this.locationType = 'container'
      this._location = container
      container.containing.push(this)
    }
  }

  // TODO: PhysicalObject#surface (getter/setter)
  get surface() {
    // non-recursively find the surface that this object is on
    if(this.locationType == 'surface')
      return this._location
    else return null
  }
  set surface(surface) {
    // set the location of this object to a surface
    this.removeSelfFromLocation()
    if(surface.isSurface) {
      this.locationType = 'surface'
      this._location = surface
      surface.supporting.push(this)
    }
  }

  get location() {
    // return the location of this object, or null
    return this._location
  }
  set location(location) {
    // set the location of this object
    this.removeSelfFromLocation()
    if(!location) {
    } else if(location.isRoom) {
      this.room = location
    } else if(location.isPhysicalObject) {
      if(location.isContainer && location.isSurface)
        console.warn(
          "Warning Ambiguity! location set to object which is both a container",
          "and a surface. Defaulting to container.",
        )

      if(location.isContainer) {
        this.container = location
      } else if(location.isSurface) {
        this.surface = location
      }
    }
  }

  get subObjects() {
    // return a list of objects within or on top of this object
    return [...this.containing, ...this.supporting]
  }
  get all() {
    // recursive generate a list of all sub-objects and include this
    let list = [this]
    for(var i in this.containing)
      list.push(...this.containing[i].all)
    for(var i in this.supporting)
      list.push(...this.supporting[i].all)
    return list
  }
}
PhysicalObject.prototype.isPhysicalObject = true

PhysicalObject.prototype.addDescriptorFunctions({
  on: [
    o => o.surface ? o.surface.refRegex() : null
  ],
  in: [
    o => o.container ? o.container.refRegex() : null,
    //o => o.room ? o.room.refRegex() : null, // this line causes a stack overflow
  ]
})

module.exports = PhysicalObject
