// so far this class is just a conceptual sketch

class Sound {
  constructor() {
    this.behaviour = 'once' // "loop" or "once" (Add more later)
    this.fadeIn = null  // null or fade in duration in seconds
    this.fadeOut = 0.25    // null or fade out duration in seconds
    this.adjustTime = 0.25

    this._audiobuffer = null // an audiobuffer of a pre-rendered sample
    this._generate // function, a generative way to make this sound

    this.emitter = null
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
}
module.exports = Sound
