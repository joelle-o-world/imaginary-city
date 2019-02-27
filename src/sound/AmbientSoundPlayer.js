// NOTE: a browser-only class
if(!AudioContext)
  throw "AmbientSoundPlayer only works in a browser with Web Audio API"

class AmbientSoundPlayer() {
  constructor(audioctx) {
    this.ctx = audioctx
    this.currentMix = []  // a list of all the sounds currently playing, with mix details
          // eg, {sound: [Sound object], mixParameters: {...}}
  }

  updateMix(nextMix) {
    if(!nextSounds || nextMix.constructor != Array)
      throw "updateMix expects an array of sound mixes"

    // stop and delete nowPlaying sounds not in nextSounds
    let nextSounds = nextMix.map(mix => mix.sound)
    let soundsToStop = this.currentMix.filter(mix => !nextSounds.includes(mix.sound))
    for(let {sound} of soundsToStop)
      this.stop(sound)

    // TODO: update nowPlaying sounds which are in nextSounds


    // TODO: introduce nextSounds which are not already playing
    let currentSounds = this.currentMix.map(channel => channel.sound)
    let soundsToAdd = nextMix.filter(mix => !currentSounds.include(mix.sound))
    for(let {sound, mixParameters} of soundsToAdd)
      this.play(soundMix, mixParameters)
  }

  // TODO: stop(sound)
  // TODO: play(sound, mixParameters)
  async play(sound, mixParameters) {
    let buffer = await sound.audiobuffer
    // create a buffer source node
    let source = new AudioBufferSourceNode(this.ctx, buffer)
    // apply attenuation
    // connect to output
    source.connect(this.ctx.destination)
  }

  // TODO: re-mix(sound, mixParameters)
}
module.exports = AmbientSoundPlayer
