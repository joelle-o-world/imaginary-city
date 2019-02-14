const sub = require("../utility/Substitution").substitute
const conjugate = require("../utility/conjugate/conjugate")

const adjectives = require("../wordlists/adjectives.words.json")
const nouns = require("../wordlists/nouns.words.json")
const verbs = require("../wordlists/verbs.words.json")
const adverbs = require("../wordlists/adverbs.words.json")

module.exports = {
  adjective() {
    return adjectives[Math.floor(Math.random()*adjectives.length)]
  },
  noun() {
    return nouns[Math.floor(Math.random()*nouns.length)]
  },
  verb() {
    return verbs[Math.floor(Math.random()*verbs.length)]
  },
  adverb() {
    return adverbs[Math.floor(Math.random()*adverbs.length)]
  },

  nounPhrase() {
    return 'a '+this.adjective()+' '+this.noun()
  },

  nounPhraseWithAction() {
    return [
      this.nounPhrase(),
      conjugate(this.verb(), 7),
      this.nounPhrase()
    ].join(' ')
  }
}
