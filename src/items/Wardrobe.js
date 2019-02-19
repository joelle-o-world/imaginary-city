/*
  Generative subclass of Cupboard. Automatically populated with clothes.
*/

const Cupboard = require("./Cupboard")
const GenericItem = require("./GenericItem")
const Garment = require('../garments/Garment')

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
    let numberOfItemsOfClothing = Math.random() * 5
    for(var i=0; i<numberOfItemsOfClothing; ++i) {
      let type = typesOfClothes[Math.floor(Math.random()*typesOfClothes.length)]
      let item = new Garment(type)
      item.container = this
      console.log(item)
    }
  }
}
Wardrobe.prototype.isWardrobe = true
Wardrobe.prototype.nouns = ['wardrobe']
module.exports = Wardrobe
