const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
]

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
module.exports = randomColor
