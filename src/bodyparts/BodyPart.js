/*
  The base class for all body parts. Sub-class of Noumenon

  Possible sub-class structure:
    - Torso
    - Appendage
      - Arm
      - Leg
    - Foot
      - Hoof
      - HumanoidFoot
    - Hand/Prehensile
      - Claw
      - HumanoidHand
    - Head
    - Neck
    - Toe
    - Finger
    - Eyes (eyes are grouped as )
    - Mouth
    - Nose
    - Ear
*/

const Noumenon = require("../Noumenon.js")

class BodyPart extends Noumenon {
  constructor() {
    this.appendages //
    this.cladding // eg/ skin, fur, scales, feathers
    this.claddingColor // the color of the cladding
  }
}
module.exports = BodyPart
