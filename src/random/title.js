const titles = ["Mr", "Mrs", "Ms", "Dr", "Professor"]

function randomTitle() {
  return titles[Math.floor(Math.random() * titles.length)]
}
module.exports = randomTitle
