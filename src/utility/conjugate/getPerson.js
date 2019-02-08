// Determine the numeric person of a given noun phrase

/*
VERB FORMS DENOTED AS NUMBERS:
  0.  infinitive
  1.  first person singular
  2.  second person singular
  3.  third person singular
  4.  first person plural
  5.  second person plural
  6.  third person plural
  (7. gerund/present-participle)
  (8. past-participle)
  (9. past tense form)
*/

function getPerson(subject) {
  // if subject is not a string, assume third person for now
  if(subject && subject.constructor != String)
    return 3

  let lowerCaseSubject = subject.toLowerCase()

  if(lowerCaseSubject == 'i')
    return 1 // first person singular

  else if(lowerCaseSubject == 'you')
    return 2 // or 5 but never mind

  else if((/^(he|she|it)$/i).test(subject))
    return 3 // third person singular

  else if(lowerCaseSubject == 'we')
    return 4 // first person plural

  else if(lowerCaseSubject == 'they')
    return 6 // third person plural

  else // otherwise assume third person
    return 3

  // TODO, what about third person plural non pronouns!
}
module.exports = getPerson
