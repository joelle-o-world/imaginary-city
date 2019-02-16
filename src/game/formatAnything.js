const {sentencify} = require('../utility')
const Action = require('../action/Action')

function format(o, ctx) {
  if(!o)
    return null

  if(o.constructor == String)
    return sentencify(o)

  if(o.isAction)
    return format(o.str('simple_past', ctx))

  if(o.isSubstitution)
    return format(o.str(ctx), ctx)

  if(o.constructor == Object && o._verb)
    return format(new Action(o), ctx)

}
module.exports = format
