// NOTE: a browser-only class
if(!AudioContext)
  throw "SoundPlayer only works in a browser with Web Audio API"

const ZEROLEVEL = 0.01

class SoundPlayer {
  constructor(destination) {
    this.destination = destination
    this.currentMix = []  // a list of all the sounds currently playing, with mix details
          // eg, {sound: [Sound object], mixParameters: {...}}
  }

  get ctx() {
    return this.destination.context
  }

  updateMix(nextMix, adjustTime) {
    if(!nextMix || nextMix.constructor != Array)
      throw "updateMix expects an array of sound mixes"

    // stop and delete nowPlaying sounds not in nextSounds
    let nextSounds = nextMix.map(mix => mix.sound)
    let soundsToStop = this.currentMix.filter(mix => !nextSounds.includes(mix.sound))
    for(let {sound} of soundsToStop)
      this.stop(sound)

    // introduce nextSounds which are not already playing
    let currentSounds = this.currentMix.map(channel => channel.sound)
    let soundsToAdd = nextMix.filter(mix => !currentSounds.includes(mix.sound))
    for(let {sound, mixParameters} of soundsToAdd)
      this.play(sound, mixParameters)

    // adjust parameters of sounds which already exist
    let soundsToAdjust = nextMix.filter(channel =>
      !soundsToAdd.includes(channel.sound) &&
      !soundsToStop.includes(channel.sound)
    )
    for(let {sound, mixParameters} of soundsToAdjust)
      this.adjustChannel(sound, mixParameters, adjustTime)
  }


  async play(sound, mixParameters={}) {
    let buffer = await sound.audiobuffer

    // create a buffer source node
    let source = new AudioBufferSourceNode(this.ctx, {
      buffer: buffer,
      loop: sound.behaviour == 'loop',
    })

    // apply attenuation
    let gain = mixParameters.gain || 1
    let gainNode = this.ctx.createGain()
    if(sound.fadeIn) {
      gainNode.gain.setValueAtTime(ZEROLEVEL, this.ctx.currentTime)
      gainNode.gain.linearRampToValueAtTime(
        gain,
        this.ctx.currentTime+sound.fadeIn,
      )
    } else
      gainNode.gain.value = gain

    // connect to output
    source.connect(gainNode)
    gainNode.connect(this.ctx.destination)

    source.start()
    sound.emit('audioPlaying')
    sound.soundPlayer = this

    let channel = {
      sound: sound,
      mixParameters: mixParameters,
      gainNode: gainNode,
      source: source,
    }
    this.currentMix.push(channel)

    source.onended = () => {
      let i = this.currentMix.indexOf(channel)

      if(i != -1)
        this.currentMix.splice(i, 1)

      sound.emit('audioPaused', source)
      if(sound.behaviour == 'once')
        sound.emit('end')

      console.log('ended:', sound)
    }
  }

  stop(sound) {
    // find the channel of the sound
    let i
    if(sound.isSound)
      i = this.currentMix.findIndex(channel => channel.sound == sound)
    else if(sound.constructor == Number) {
      i = sound
      sound = this.currentMix[i].sound
    }
    let channel = this.currentMix[i]

    // fade it out or stop it immediately
    if(sound.fadeOut) {
      let endTime = sound.fadeOut + this.ctx.currentTime
      channel.gainNode.gain.linearRampToValueAtTime(ZEROLEVEL, endTime)
      channel.source.stop(endTime)
    } else {
      channel.source.stop()
    }
  }

  adjustChannel(sound, newMixParameters={}, adjustTime=sound.adjustTime) {
    let channel = this.currentMix.find(c => c.sound == sound)

    let adjustedTime = this.ctx.currentTime + adjustTime

    // update attenuation
    if(newMixParameters.gain)
      channel.gainNode.gain.linearRampToValueAtTime(
        newMixParameters.gain, adjustedTime
      )
  }

  stopAll() {
    for(let {sound} of this.currentMix)
      this.stop(sound)
  }
}
module.exports = SoundPlayer
