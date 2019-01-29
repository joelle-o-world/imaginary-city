// For the surface of a body part

const claddings [
  "skin",
  "feathers",
  "scales",
  "fur",
]

function randomCladding() {
  return claddings[Math.floor(Math.random()*claddings.length)]
}
module.exports = randomCladdings
