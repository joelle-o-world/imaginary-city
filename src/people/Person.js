/*
  A class representing a person.
*/

const PhysicalObject = require("../PhysicalObject")
const random = require("../random")
const utility = require("../utility")
const sub = utility.sub

class Person extends PhysicalObject {
  constructor() {
    super()

    this.__suspendInit__("hairColor", () => random.color())
    this.__suspendInit__("firstName")
    this.__suspendInit__("surname")
    this.__suspendInit__("title")

    this.location = null
  }

  get fullName() {
    return this.firstName + " "+ this.surname
  }
}

Person.prototype.isPerson = true

Person.prototype.nouns = [
  "person", "human", "human being",
]
Person.prototype.properNouns = [
  person => person.fullName,
  person => person.firstName,
  person => person.title + " " + person.surname,
  person => person.title + " " + person.fullName,
]

Person.prototype.addDescriptorFunctions({
  "adj": [
    person => person.hairColor + " haired", // this is actually fine
  ]
})

Person.prototype.addDescription(
  person => sub("_ has _ hair.", person, person.hairColor),
  //person => utility.possessive(person.ref({article:'the'}))+ " name is "+person.fullName+'.',
  person => sub("_'s name is _", person, person.fullName),
)

Person.prototype.addPossibilty(
  {
    verb:'admire',
    consequence: (_subject, _object) => {
      //console.log(_subject, 'admired', _object)
    }
  }
)

module.exports = Person
