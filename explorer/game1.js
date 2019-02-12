const CommandTemplate = require("../explorer/CommandTemplate.js")
const Explorer = require("../explorer/Explorer")
const Environment = require("../explorer/Environment")
const TownHouse = require("../src/buildings/TownHouse")
const utility = require("../src/utility")
const TickyText = require("../interface/TickyText")
const TTSQueue = require("../interface/TTSQueue")



const environment = new Environment
const game = new Explorer(environment)

const person = environment.protagonist

// createWorld
let house = new TownHouse
person.location = house.randomRoom()

function describeSurroundings() {
  let room = person.location
  let allContents = room.all
  /*if(allContents.length) {
    game.writeln(
      "Inside ",
      room.ref({article:"the"}),
      " there's ",
      utility.quantify(allContents.length, "object")+":"
    )
    for(var i in allContents)
      game.writeln("\t- ", allContents[i].ref({article:"a", detail:2}))
  } else
    game.writeln(room.ref({article:"The"}), " is empty.")*/
  // report doors
  var accessibleRooms = person.room.accessibleRooms
  game.writeParagraph(
    "There's",
    utility.quantify(accessibleRooms.length, "door"),
    "leading to",
    utility.printList(accessibleRooms.map(r => r.ref({detail: 0, article:"a"})))
  )
}

function moveCharacter(room) {
  if(room.isDoor)
    room = room.fromTo(person.location)
  if(!room.isRoom && !room.isContainer)
    return person.ref() + " walked into "+ room.ref() + ", "+
      "which proved inadvantageous."

  var oldLocation = person.location
  person.location = room

  game.writeParagraph(person.ref() + " leaves " + oldLocation.ref({article:"the"}) + " and goes into " + room.ref()+".")

  // report items
  describeSurroundings()
}
function goThroughDoor(door) {
  if(!door.isDoor)
    return person.ref() +
      " attempted to go through "+ door.ref() +
      " as though it were a door."

  let to = door.fromTo(person.location)
  if(to)
    return moveCharacter(to)
  else
    return person.ref() +
    " tried to walk through a door which was not connected to the room they were in."
}



game.addCommand(
  ["look at _", "_"],
  thing => person.ref() + " looks at " + thing.ref({detail: 3}) + ".",
)
game.addCommand(["go to _", "go into _"], room => moveCharacter(room))
game.addCommand(
  ["go out", "leave", "exit"],
  () => {
    if(person.location.isRoom)
      moveCharacter(person.location.randomAccessibleRoom())
    else
      moveCharacter(person.location.location)
  }
)
game.addCommand(
  ["what color is _", "what colour is _"],
  o => o.color
        ? "The "+o.noun+" is "+o.color+"."
        : "The "+o.noun+" is without color.",
)
game.addCommand(["go through _", "go through _ as thought it is a door"], door => goThroughDoor(door))
game.addCommand(["not understood","not understood."], () => "That's my line.")
game.addCommand("I understand", () => "How nice.")
game.addCommand("hello _", o => person.ref() + " says hello to "+o.ref())
game.addCommand("goodbye _", o => person.ref() + " says goodbye to "+o.ref())
game.addCommand("put _ on _", (item, surface) => {
  if(!surface.isSurface)
    return "It is not possible to put things on "+surface.ref()
  if(!surface.canRestOnSurface)
    return "It is not possible to put "+surface.ref()+" on top of anything."
  item.surface = surface
  return person.ref() + " put "+item.ref()+" on top of "+surface.ref()+"."
})
game.addCommand("where is _", o => {
  if(o.location) {
    if(o.locationType == 'surface')
      return o.ref()+" is on "+o.location.ref()
    else
      return o.ref()+" is in "+o.location.ref()
  } else
    return o.ref()+" is nowhere."
})
game.addCommand(["what is on _", "look on _"], surface => {
  if(surface.isSurface && surface.supporting.length) {
    let str = "There are "+surface.supporting.length+" things on "+surface.ref()+".\n"
    for(var i in surface.supporting)
      str += "\t"+surface.supporting[i].ref() + '\n'

    return str
  } else
    return "There is nothing on "+surface.ref()+'.'
})
game.addCommand(["what is in _", "look in _"], container => {
  if(container.isContainer && container.containing.length) {
    let str = "There are "+container.containing.length+" things in "+container.ref()+".\n"
    for(var i in container.containing)
      str += "\t"+container.containing[i].ref() + '\n'

    return str
  } else if(container.isRoom)
    moveCharacter(container)
   else
    return "There is nothing in "+container.ref()+'.'
})
game.addCommand("look under _", o =>
  o.surface ?
    "Under "+o.ref()+" there is "+o.surface.ref()+"." :
    "There is nothing under "+o.ref()+"."
)
game.addCommand("who am i", o => "You are "+person.ref()+".")
game.addCommand("what is _ made of", item =>
  item.madeOf
    ? item.ref({article:"the"}) +" is made from "+item.madeOf+'.'
    : item.ref({article:"the"}) + " is not made from anything."
)

// intro
game.start = function() {
  game.writeln("\n\n")
  game.writeSentence(person.ref(), "is in", person.location.ref({article:"the"}))
  game.newline()
  describeSurroundings()

  game.writeln("\n")

  //game.listen()


}

function iterativeDescribe() {
  setTimeout(() => {
    let str = environment.randomNoumenon().describe()
    if(str) {
      if(Math.random() < 0.2)
        game.write("\n")
      game.writeSentence(str)
    }
  }, 4000)
}

function begin() {
  const tt = new TickyText(document.getElementById("output"))
  const tts = null//new TTSQueue(responsiveVoice)


  game.write = (...strs) => {
    if(tts)
      tts.speak(strs.join(""), "UK English Female", {rate: 0.85, pitch:1/2})
    tt.write(...strs)
  }
  //game.writeln = (...str) => tt.writeln(...str)
  game.start()

  tt.onStopTicking = () => {
    iterativeDescribe()
  }

  if(window.responsiveVoice)
    window.responsiveVoice.voiceSupport()

  document.getElementById("userInput").placeholder = "Please enter an instruction for "+person.fullName+"."

  document.removeEventListener('click', begin)
}


document.addEventListener('click', begin)
window.userInput = str => game.input(str)
