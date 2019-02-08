/*
  Given the infinitive form of a verb and a person/verbform number (0-8) return
  the conjugated verb form.
*/

/*
VERB FORMS DENOTED AS NUMBERS:
  0.  infinitive
  1.  first person singular
  2.  second person singular
  3.  third person singular
  4.  first person plural
  5.  second person plural
  6.  third person plural
  (7.  gerund/present-participle)
  (8.  past-participle)
  (9. past tense form)
*/

const irregular = require("./irregularConjugations")

const endsWithShortConsonant = /[aeiou][tpdn]$/
const endsWithE = /e$/
const endsWithO = /o$/

function conjugate(infinitive, form) {
  if(irregular[infinitive] && irregular[infinitive][form])
    return irregular[infinitive][form]
  return conjugateRegular(infinitive, form)
}

function conjugateRegular(infinitive, form) {
  switch(form) {
    // third person singular
    case 3:
      if(endsWithO.test(infinitive))
        return infinitive+'es'
      else
        return infinitive+'s'

    // gerund
    case 7:
      if(endsWithE.test(infinitive))
        return infinitive.slice(0, infinitive.length-1)+'ing'
      if(endsWithShortConsonant.test(infinitive))
        return infinitive + infinitive[infinitive.length-1]+'ing'
      return infinitive+'ing'

    // past participle
    case 9:
    case 8:
      if(endsWithShortConsonant.test(infinitive))
        return infinitive + infinitive[infinitive.length-1]+'ed'
      if(endsWithE.test(infinitive))
        return infinitive+'d'
      else
        return infinitive+'ed';

    default:
      return infinitive
  }
}


module.exports = conjugate
