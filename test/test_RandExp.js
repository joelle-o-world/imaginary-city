const {randexp} = require("randexp")

let articleRE = "((a|the))"
let nouns = "(dog|cat|mouse)"
let concat = articleRE + nouns

console.log(concat, ":\t", randexp(concat))
