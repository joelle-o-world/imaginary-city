const parseText = require("./parseText")

const articles = [
  "the", // definite article
  "A", "a", "an", // indefinite articles
  "my", "your", "his", "her", "our", "their", // possessive adjectives
  "this", "that", // demonstrative pronouns as adjectives
]

function parseNounPhrase(str) {
  // - seperate the words as abstract from the punctuation
  var words = parseText(str).filter(parseText.isWord)

  // - identify the article or possessive adjective, if exists
  // Assumption: if there is an article or possessive adjective, it will be the first word.
  let article = null
  if(articles.indexOf(words[0]) != -1)
    article = words.shift()

  // asume the noun is the last word
  let noun = words.pop()
  // asume any words inbetween are adjectives
  let adjectives = words.slice()

  return {
    article: article,
    adjectives: adjectives,
    noun: noun,
  }
}
module.exports = parseNounPhrase
