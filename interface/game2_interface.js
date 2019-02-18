const myGame = require("../src/game/game2.js")
const TickyText = require("./TickyText")
const TTSQueue = require("./TTSQueue")



window.onload = function() {
  let ticky_text = new TickyText(document.getElementById('output'))

  const tts = new TTSQueue(responsiveVoice)

  myGame._write = str => {
    ticky_text.write(str)
    if(tts)
      tts.speak(str, "UK English Male", {rate: 1, pitch:2})
  }
}

window.onclick = function() {
  myGame.begin()
  window.onclick = null
}
window.userInput = function(str) {
  myGame.input(str)
}
