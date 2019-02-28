const EventEmitter = require('events')

class Sound extends EventEmitter{
  constructor() {
    super()
    // behaviour details
    this.behaviour = 'once' // "loop" or "once" (Add more later)
    this.fadeIn = null  // null or fade in duration in seconds
    this.fadeOut = 0.25    // null or fade out duration in seconds
    this.adjustTime = 0.25

    // buffer/sample/generation
    this._audiobuffer = null // an audiobuffer of a pre-rendered sample
    this._generate // function, a generative way to make this sound

    // the noumenon source of the sound
    this.noumenonSource = null

    // audio status
    this.playing = false
    this.nowPlayingAudio = false
    this.on('audioPlaying', () => {
      if(this.nowPlayingAudio)
        throw 'a sound cannot play in two places at once'
      else
        this.nowPlayingAudio = true
    })
    this.on('audioPaused', () => {
      this.nowPlayingAudio = false
    })
  }

  get audiobuffer() {
    if(this._audiobuffer)
      return this._audiobuffer
    else if(this._generate)
      return this.generate()

    console.warn('could not generate audio buffer', this)
  }

  async generate() {
    if(!this._generate)
      console.warn("sound has no generate function")
    this._audiobuffer = await this._generate()
    if(!this._audiobuffer)
      console.warn("sound.generate() failed")
    return this._audiobuffer
  }

  start() {
    // start the sound conceptually
    if(this.isContinuous) {
      this.noumenonSource.nowPlayingSounds.push(this)
      this.once('stop', () => {
        let i = this.noumenonSource.nowPlayingSounds.indexOf(this)
        if(i != -1)
          this.noumenonSource.nowPlayingSounds.splice(i, 1)
      })
    }
    if(this.isAudible) {
      let player = this.noumenonSource.location.soundPlayer
      if(this.isContinuous) {
        // sound is audible and continuous
        this.emit('start')
        player.play(this)
      } else {
        // sound is audible and non-continuous, so play it once then stop it.
        this.once('audioPaused', () => {
          this.stop()
        })
        this.emit('start')
        player.play(this)
      }
    } else {
      if(this.isContinuous) {
        // sound is inaudible and continuous
        this.emit('start')
      } else {
        // sound is inaudible and non-continuous, so skip straight to end
        this.emit('end')
        return null
      }
    }
  }
  stop() {
    // stop the sound conceptually
    if(this.nowPlayingAudio) {
      // audio is playing, so stop the the audio then end the sound
      this.playing = false
      this.emit('stop')
      this.once('audioPaused', () => {
        this.emit('end')
      })
      this.soundPlayer.stop(this)
    } else {
      // audio is not playing, so end the sound immediately
      this.playing = false
      this.emit('stop')
      this.emit('end')
    }
  }

  get isContinuous() {
    return this.behaviour == 'loop'
  }
  get isAudible() {
    return this.noumenonSource &&
      this.noumenonSource.location &&
      this.noumenonSource.location.soundPlayer
  }
}
Sound.prototype.isSound = true
module.exports = Sound
