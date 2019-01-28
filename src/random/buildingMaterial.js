const buildingMaterials = [
  // adjectives for describing building materials
  "bricks",
  "concrete",
  "wood",
  "steel and glass",
]

function randomBuildingMaterial() {
  return buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)]
}
module.exports = randomBuildingMaterial
