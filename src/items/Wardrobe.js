/*
  Generative subclass of Cupboard. Automatically populated with clothes.
*/

const Cupboard = require("./Cupboard")
const GenericItem = require("./GenericItem")

const typesOfClothes = [
  "pair of trousers",
  "dress",
  "skirt",
  "pair of socks",
  "shirt",
  "t shirt",
  "blouse",
  "cardigan",
  "jumper",
]

class Wardrobe extends Cupboard {
  constructor() {
    super()

    // randomly populate the wardrobe
    let numberOfItemsOfClothing = Math.random() * 20
    for(var i=0; i<numberOfItemsOfClothing; ++i) {
      let type = typesOfClothes[Math.floor(Math.random()*typesOfClothes.length)]
      let item = new GenericItem(type)
      item.container = this
    }
  }
}
Wardrobe.prototype.isWardrobe = true
Wardrobe.prototype.nouns = ['wardrobe']
module.exports = Wardrobe
