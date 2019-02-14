const {sentencify} = require('../utility')

function formatAnything(o, ctx) {
  if(!o)
    return null

  if(o.constructor == String)
    return sentencify(o)

  if(o.isAction)
    return o.str('simple_past')

  if(o.isSubstitution)
    return o.str(ctx)

}
module.exports = formatAnything
