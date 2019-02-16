function do(action) {
  return {do:true, action:action}
}

function observe(action) {
  return {do: false, action:action}
}

module.exports = {
  do: do,
  observe: observe,
}
