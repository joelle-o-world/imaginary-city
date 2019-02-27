// so far this class is just a conceptual sketch

class Sound {
  constructor() {
    this.behaviour // "loop" or "one-shot" (Add more later)
    this._audiobuffer = null // an audiobuffer of a pre-rendered sample
    this._generate // function, a generative way to make this sound
  }

  get audiobuffer() {
    if(this._audiobuffer)
      return this._audiobuffer
    else if(this._generate)
      return this.generate()
  }

  async generate() {
    this._audiobuffer = await this._generate()
    return this._audiobuffer
  }
}
module.exports = sound
