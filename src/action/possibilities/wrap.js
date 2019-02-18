const Action = require("../Action")

function observe(action) {
  if(!action.isAction && action._verb)
    action = new Action(action)

  action.executed = true

  return action
}

module.exports = {
  observe: observe,
}
