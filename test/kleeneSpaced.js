const {randexp} = require('randexp')
const argv = require('minimist')(process.argv.slice(2))
const regOps = require('../src/utility/regex')

//let kleeneSpaced = /^(?:\w+)(?: \w+)*$/
let reg = new RegExp('^'+regOps.kleenePoliteList(/cat|dog|mango/, ', ').source+'$')
console.log(reg)


for(var str of argv._)
  console.log(str,'=>', reg.test(str))

for(var i=0; i<5; i++) {
  console.log(randexp(reg), '\n\n')
}
