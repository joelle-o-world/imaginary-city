const SoundPlayer = require("../../src/sound/SoundPlayer")
const Sound = require('../../src/sound/Sound')
const DuspLoop = require('../../src/sound/DuspLoop')
const DuspOnce = require('../../src/sound/DuspOnce')
const {
  unDusp, renderChannelData, channelDataToAudioBuffer, renderAudioBuffer
} = require('dusp')


window.onclick = () => {
  let audioctx = new AudioContext
  let player = new SoundPlayer(audioctx.destination)

  let sound1 = new DuspLoop('O3000 * D0.025/ 10', 2)
  let sound2 = new DuspLoop('Noise / 1000', 2)
  let sound3 = new DuspLoop('(Noise -> LP30) + Z55/5000', 5)
  let sound4 = new DuspLoop('O40 * D1/10', 4)

  player.play(sound1, {})
  player.play(sound2, {})



  setTimeout(() => {
    player.updateMix([
      {sound:sound3, mixParameters:{}},
      {sound:sound4},
    ])
  }, 10000)
}
