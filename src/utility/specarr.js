/*
  A set of tools for using the so-called 'special array', or 'specarr'.
*/

function specarr_regexs(target, specialArr, ctx) {
  // convert a 'special array' into an array of strings and regular expressions
  if(!target || !target.isNoumenon)
    throw "expects target to be a Noumenon."
  if(!specialArr || specialArr.constructor != Array)
    throw "expects specialArr to be an array."

  var out = [] // the output array
  for(var i in specialArr) {
    let item = specialArr[i]

    if(!item) // skip null values
      continue

    else if(item.constructor == String) // accept strings
      out.push(new RegExp(item))

    else if(item.constructor == RegExp) // accept regular expressions
      out.push(item)

    else if(item.isNoumenon)
      out.push(item.refRegex(ctx))

    // if substitution, interpret the substitution as a regex and add
    else if(item.isSubstitution) {
      console.warn("Very odd, a substitution that is not returned by a function")
      out.push(item.getRegex(ctx))
    }

    else if(item.constructor == Function) {
      // call function on the target
      let result = item(target, ctx)

      // if result is null, skip.
      if(!result)
        continue;
      // accept result if RegExp
      else if(result.constructor == RegExp)
        out.push(result)
      // if string cast as RegExp and accept
      else if(result.constructor == String)
        out.push(new RegExp(result))
      // if substitution, interpret the substitution as a regex and add
      else if(result.isSubstitution) {
        let subbed = result.getRegex(ctx)
        if(subbed)
          out.push(subbed)
      }
      // if array, recursively interpret and concatenate the result
      else if(result.constructor == Array)
        out = out.concat(specarr_regexs(target, result, ctx))
      // if noumenon, return its regex
      else if(result.isNoumenon)
        out.push(result.refRegex(ctx))
      else
        console.warn("Uninterpretted value from function:", result)
    } else
      console.warn("Uninterpretted value from list:", item)
  }

  // perhaps remove duplicates?
  for(var i in out) {
    if(out[i].constructor != RegExp)
      console.warn("specarr_regexs returned item which is not a regex:", out[i])
  }

  return out
}

module.exports = {
  toRegexs: specarr_regexs,
}
