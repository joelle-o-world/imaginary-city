const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet"
]

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
module.exports = randomColor
