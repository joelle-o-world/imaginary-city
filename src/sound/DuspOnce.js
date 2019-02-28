const Sound = require('./Sound')
const {unDusp, renderAudioBuffer} = require('dusp')

class DuspOnce extends Sound {
  constructor(duspStr, duration=10) {
    super()
    this.duspStr = duspStr
    this.duration = duration

    this.behaviour = 'once'
    this.fadeIn = null
    this.fadeOut = 1
    this.adjustTime = 1
  }

  _generate() {
    return renderAudioBuffer(unDusp(this.duspStr), this.duration)
  }
}
module.exports = DuspOnce
