const materials = [
  "silk",
  "denim",
  "leather",
  "rubber",
  "stone",
  "wood",
  "granite",
  "bricks",
  "metal",
  "iron",
  "ice",
]

function randomMaterial() {
  return materials[Math.floor(Math.random() * materials.length)]
}
module.exports = randomMaterial
