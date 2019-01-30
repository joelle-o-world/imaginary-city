/*
  A class representing a person
*/

const Noumenon = require("../Noumenon")
const random = require("../random")

class Person extends Noumenon {
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
  person => person.fullName,
  person => person.firstName,
  person => person.title + " " + person.surname,
  person => person.title + " " + person.fullName,
]

module.exports = Person
