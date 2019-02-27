const AmbientSoundPlayer = require("../../src/sound/AmbientSoundPlayer")
const Sound = require('../../src/sound/Sound')

let audioctx = new AudioContext
let player = new AmbientSoundPlayer(audioctx)

let sound1 = new Sound()
