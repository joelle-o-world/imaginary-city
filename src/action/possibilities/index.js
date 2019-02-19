const {sub} = require('../../utility')
const Action = require('../Action')
const random = require('../../random')
const {getDoors} = require('../../rooms/getRoute')

module.exports = [
  ...require('./looking.js'),
  ...require('./moving.js'),
  ...require('./pointless.js'),
  ...require("./carrying.js"),
  ...require('./activities.js'),
]
