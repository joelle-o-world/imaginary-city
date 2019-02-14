const {sentencify} = require('../utility')

function format(o, ctx) {
  if(!o)
    return null

  if(o.constructor == String)
    return sentencify(o)

  if(o.isAction)
    return format(o.str('simple_past'))

  if(o.isSubstitution)
    return format(o.str(ctx))

}
module.exports = format
