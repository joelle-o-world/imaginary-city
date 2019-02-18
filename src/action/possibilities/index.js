const {sub} = require('../../utility')
const Action = require('../Action')
const random = require('../../random')
const {getDoors} = require('../../rooms/getRoute')

module.exports = [
  // looking around
  ...require('./looking.js'),

  // MOVING ARROUND
  ...require('./moving.js'),

  // POINTLESS THINGS
  ...require('./pointless.js')
]
