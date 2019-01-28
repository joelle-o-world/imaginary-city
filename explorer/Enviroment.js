/*
  The Enviroment object's prime responsibility it interpretting object strings.
  That is, natural language references to objects made by the user to objects
  in the game. These will usually take the form of noun-phrases.

  This task is broken into the following parts:
  1. Maintaining a list of objects which could be referenced.
      - Objects in the Room the user is currently in.
        - including objects within objects
      - Doors leading from the room the user is currently in.
      - Objects on the user's Person
      - Other categories not yet thought of
  2. Being able to test whether a given natural language regerence, matches a
    given object
  3. Searching the list of objects which could be referenced to matches of a
    given NL-Object-reference

*/

const parseNounPhrase = require("./parseNounPhrase")
const {Person} = require("../src")

class Enviroment {
  constructor() {
    this.character = new Person
  }

  findNoumenon(str) {
    var parsed = parseNounPhrase(str)
    console.log(parsed)
  }
}
module.exports = Enviroment
