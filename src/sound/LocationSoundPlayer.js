const SoundPlayer = require('./SoundPlayer')

class LocationSoundPlayer extends SoundPlayer {
  constructor(locationNoumenon, audioDestination) {
    super(audioDestination)
    this.location = locationNoumenon

    for(let sound of this.location.nowPlayingSounds) {
      this.play(sound)
    }
    for(let {nowPlayingSounds} of this.location.locating) {
      for(let sound of nowPlayingSounds)
        this.play(sound)
    }
  }
}
module.exports = LocationSoundPlayer
