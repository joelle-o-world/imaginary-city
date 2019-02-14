const myGame = require("../src/game/game2.js")
const TickyText = require("./TickyText")
const TTSQueue = require("./TTSQueue")



window.onload = function() {
  let ticky_text = new TickyText(document.getElementById('output'))

  myGame._write = str => ticky_text.write(str)


  myGame.begin()
}
window.userInput = function(str) {
  myGame.input(str)
}
