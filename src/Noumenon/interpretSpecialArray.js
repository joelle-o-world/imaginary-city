/*
  A function for interpretting a type of structure which exists often in
  noumenon descriptors. An array of strings, regular expressions, and functions.
  The functions must be deterministic and return either a string, a regular
  expression or an array of strings and regular expressions.
*/

function interpretSpecialArray(target, specialArr) {
  if(!target || !target.isNoumenon)
    throw "expects target to be a Noumenon"
  if(!specialArr || specialArr.constructor != Array)
    throw "expects specialArr to be an array"

  var out = [] // the output array
  for(var i in specialArr) {
    let item = specialArr[i]

    if(!item) // skip null values
      continue

    else if(item.constructor == String) // accept strings
      out.push(item)

    else if(item.constructor == RegExp) // accept regular expressions
      out.push(item)

    else if(item.constructor == Function) {
      // call function on the target
      let result = item(target)

      // if result is null, skip.
      if(!result)
        continue;
      // accept result if a string or RegExp
      else if(result.constructor == String || result.constructor == RegExp)
        out.push(result)
      // if array, recursively interpret and concatenate the result
      else if(result.constructor == Array)
        out = out.concat(interpretSpecialArray(target, result))
      else
        console.warn("Uninterpretted value:", result)
    } else
      console.warn("Uninterpretted value:", item)
  }

  // perhaps remove duplicates?

  return out
}
module.exports = interpretSpecialArray
