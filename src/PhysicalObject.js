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

    this.containing = [] // list of objects contained inside this object
    this.supporting = [] // list of objects resting on the surface of this object
  }

  removeSelfFromLocation() {
    // extract
    if(this._location) {
      let loc = this._location
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
    if(room.isRoom) {
      this.removeSelfFromLocation()
      this.locationType = 'room'
      this._location = room
      room.contents.push(this)
    }  else console.warn(
      "Tried to set the room of an object",
      "("+this.ref()+")",
       "on top of a non-room",
       "("+room.ref()+")"
    );
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
    if(container.isContainer) {
      this.removeSelfFromLocation()
      this.locationType = 'container'
      this._location = container
      container.containing.push(this)
    } else console.warn(
      "Tried to put an object",
      "("+this.ref()+")",
       "inside of a non-surface",
       "("+container.ref()+")"
    );
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
    if(surface.isSurface) {
      this.removeSelfFromLocation()
      this.locationType = 'surface'
      this._location = surface
      surface.supporting.push(this)
    } else console.warn(
      "Tried to put an object",
      "("+this.ref()+")",
       "on top of a non-surface",
       "("+surface.ref()+")"
    );
  }

  get location() {
    // return the location of this object, or null
    return this._location
  }
  set location(location) {
    // set the location of this object
    if(!location) {
      this.removeSelfFromLocation()
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
    // recursively generate a list of all sub-objects and include this
    let list = [this]
    for(var i in this.containing)
      list.push(...this.containing[i].all)
    for(var i in this.supporting)
      list.push(...this.supporting[i].all)
    return list
  }

  get neighbours() {
    // return a list of items which share the same location, exclude this

    // if location is surface, return all objects on the surface except this
    if(this.locationType == 'surface')
      return this._location.supporting.filter(o => o != this)

    //if location is container, return all the containers contents expept this
    else if(this.locationTYpe == 'container')
      return this._location.containing.filter(o => o != this)

    // if location is room, return all the rooms contents except this
    else if(this.locationType == 'room')
      return this._location.contents.filter(o => o != this)
  }

  // TODO: get related() {}
}
PhysicalObject.prototype.isPhysicalObject = true

PhysicalObject.prototype.canRestOnSurface = true
// bool, can this object sit on top of something

PhysicalObject.prototype.isSurface = false
// bool, can other objects be placed on top of this object

PhysicalObject.prototype.isContainer = false
// bool, can other objects be placed inside of this object

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
      return [
        new Sub("Inside _ there is _.", o.location, o),
        new Sub("Inside of _ there is _.", o.location, o),
      ]
  },
  o => {
    if(o.locationType == 'surface')
      return [
        new Sub("_ is resting on _.", o, o.location),
        new Sub("On top of _ there is _.", o.location, o),
      ]
  },
  o => o.neighbours.map(n => new Sub("Next to _ is _", o, n))
)

module.exports = PhysicalObject
