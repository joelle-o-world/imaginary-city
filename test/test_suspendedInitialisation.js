const Noumenon = require("../src/Noumenon")

var myNoum = new Noumenon
myNoum.__suspendInit__("cat", () => "dog")
console.log(myNoum)
myNoum.cat = "lizard"
console.log(myNoum.cat)
console.log(myNoum)
