const floorings = ["carpet", "tiled", "lino", "wooden", "concrete", "leather"]

function randomFlooring() {
  return floorings[Math.floor(Math.random() * floorings.length)]
}
module.exports = randomFlooring
