const buildingMaterials = [
  // adjectives for describing building materials
  "brick",
  "concrete",
  "wooden",
  "steel and glass",
]

function randomBuildingMaterial() {
  return buildingMaterials[Math.floor(Math.random() * buildingMaterials.length)]
}
module.exports = randomBuildingMaterial
