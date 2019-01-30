/*
  TownHouse is a generative class which builds a structure of various domestic
  subclasses of Rooms.

  Generative rules:
    . The number of bedrooms is fixed by an argument in the constructor
    . There must be only one Kitchen
    . There must be at least one Bathroom. The number of bathrooms should be
    statistically proportional to the number of rooms and the poshness of the
    house.
    . There may or may not be one LivingRoom

    . The number of floors is fixed by an argument in the constructor
    . Each room is on one floor
    . Rooms (except Staircases) cannot connect to rooms on different floors
    . Staircases can connect to rooms on any number of different floors
    . The kitchen is always on the lowest floor
    . The Bathrooms and the LivingRoom may be on any floor

    . Rooms are divided into two categories, private (Bedroom/Bathroom) and
    public (Kitchen, LivingRoom, Corridor).
    . All public rooms (except additional bathrooms) must be accessible without passing through a private
    room.

    . One public room on the lowest floor is nominated as the `vestibule`
    . All rooms (except secondary bathrooms) must be connected to the vestibule
    . Some secondary bathrooms may be connected to bedrooms
    . If there is more than one floors, the vestibule is a staircase
    . If there is only one floor the vestibule may be a corridor or, if there in
    two or fewer bedrooms, the vestibule may be living room.


*/

const Noumenon = require("../Noumenon")
const Bathroom = require("../rooms/Bathroom")
const Bedroom = require("../rooms/Bedroom")
const Corridor = require("../rooms/Corridor")
const Kitchen = require("../rooms/Kitchen")
const LivingRoom = require("../rooms/LivingRoom")
const Staircase = require("../rooms/Staircase")

const random = require("../random")

const {printList} = require("../utility")

class TownHouse extends Noumenon {
  constructor(seed={}) {
    super()
    this.generateRooms(seed)
    this.__suspendInit__("buildingMaterial")
    this.__suspendInit__("color")
    // ... TO DO
  }

  generateRooms({
    numberOfBedrooms = 1 + Math.floor(Math.random()*5),
    numberOfBathrooms = 1,
    numberOfFloors = 1 + Math.floor(Math.random()*2),
    livingRoom=Math.random() < 0.5,
  }) {
    // declare indexes
    this.allRooms = []
    this.publicRooms = []
    this.privateRooms = []
    this.roomsByFloor = []
    for(var floor=0; floor<this.numberOfFloors; floor++)
      this.roomsByFloor[floor] = []


    // create the bedrooms
    this.bedrooms = []
    for(var i=0; i<numberOfBedrooms; i++){
      var bedroom = new Bedroom
      this.bedrooms.push(bedroom)
      this.privateRooms.push(bedroom)
      this.allRooms.push(bedroom)
    }

    // create the kitchen
    this.kitchen = new Kitchen
    this.publicRooms.push(this.kitchen)
    this.allRooms.push(this.kitchen)

    // create the bathroom(s)
    this.bathrooms = []
    for(var i=0; i<numberOfBathrooms; i++) {
      var bathroom = new Bathroom
      var floor = Math.floor(Math.random() * numberOfFloors)
      this.bathrooms.push(bathroom)
      this.privateRooms.push(bathroom)
      this.allRooms.push(bathroom)
    }

    // create the living room if exists
    if(livingRoom) {
      this.livingRoom = new LivingRoom
      this.publicRooms.push(this.livingRoom)
      this.allRooms.push(this.livingRoom)
    } else
      this.livingRoom = null

    // create the vestibule (staircase or corridor)
    if(numberOfFloors == 1) {
      if(numberOfBedrooms <= 2 && this.livingRoom && Math.random() < 0.5)
        this.vestibule = this.livingRoom
      else {
        this.vestibule = new Corridor
        this.allRooms.push(this.vestibule)
      }
    } else {
      this.vestibule = new Staircase
      this.allRooms.push(this.vestibule)
    }
    this.publicRooms.push(this.vestibule)

    for(var i in this.allRooms) {
      this.allRooms[i].building = this
      this.allRooms[i].house = this
    }

    // connect all rooms to the vestibule
    for(var i in this.allRooms) {
      var room = this.allRooms[i]
      if(room == this.vestibule)
        continue

      if(room.isBathroom && room != this.bathrooms[0] && Math.random() < 0.5) {
        var bedroom = this.randomBedroom()
        if(!bedroom.hasBathroom){
          bedroom.addDoor(room)
          continue
        }
      }

      this.vestibule.addDoor(room)
    }
  }

  addFrontDoor(leadingTo) {
    this.vestibule.addDoor(leadingTo)
  }

  randomBedroom() {
    return this.bedrooms[Math.floor(Math.random()*this.bedrooms.length)]
  }
  randomRoom() {
    return this.allRooms[Math.floor(Math.random() * this.allRooms.length)]
  }

  get numberOfBedrooms() { return this.bedrooms.length }
  get numberOfRooms() { return this.allRooms.length }
}

TownHouse.prototype.isTownHouse = true
TownHouse.prototype.isBuilding = true
TownHouse.prototype.nouns = ["house"]

TownHouse.prototype.addDescriptorFunctions({
  adj: [
    house => house.color,
  ],
  with: [
    house => house.numberOfRooms + " rooms",
    house => house.randomRoom().getDescriptiveReference({article:"a"}),
  ],
  "made of": [
    house => house.buildingMaterial,
  ],
  /*containing: [
    house => house.randomRoom().getDescriptiveReference({article:"a"}),
    house => (
      printList(
        house.allRooms
          .map(room => room.getDescriptiveReference({article: "a"}))
      )
    )
  ]*/
})

module.exports = TownHouse
