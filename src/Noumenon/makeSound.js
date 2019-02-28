/*
  ONE-SHOTS
  When a Noumenon emits a sounds, it sends it first to its location.
  The location may or may not have a SoundPlayer object
    If not thats fine, forget about it, no-one is listening.
    If it is, pass the sound to the SoundPlayer object.

*/

let assignments = {
  makeSound(sound) {
    if(sound.noumenonSource != this)
      sound.noumenonSource = this
    sound.start()
  }
}

module.exports = Noumenon => Object.assign(Noumenon.prototype, assignments)
