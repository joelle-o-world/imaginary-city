/*
Tenses: [source ef.co.uk]
  - Simple Present ("They walk home.")
  - Present Continuous ("They are walking home.")
  - Simple Past ("Peter lived in China in 1965")
  - Past Continuous ("I was reading when she arrived.")
  - Present Perfect ("I have lived here since 1987.")
  - Present Perfect Continuous ("I have been living here for years.")
  - Past Perfect ("We had been to see her several times before she visited us")
  - Past Perfect continuous ("He had been watching her for some time when she
    turned and smiled.")
  - Future Perfect ("We will have arrived in the states by the time you get this
    letter.")
  - Future Perfect Continuous ("By the end of your course, you will have been
    studying for five years")
  - Simple Future ("They will go to Italy next week.")
  - Future Continuous ("I will be travelling by train.")


  (Maybe also include:
  - Zero conditional ("If ice gets hot it melts.")
  - Type 1 Conditional ("If he is late I will be angry.")
  - Type 2 Conditional ("If he was in Australia he would be getting up now.")
  - Type 3 Conditional ("She would have visited me if she had had time")
  - Mixed Conditional ("I would be playing tennis if I hadn't broken my arm.")
  - Gerund
  - Present participle)
*/

const conjugate = require("./conjugate")
const getPerson = require("./getPerson")
const {sub} = require('../index')
const regOps = require("../regex")

const GERUND = 7
const PAST_PARTICIPLE = 8
const PAST_TENSE = 9

const actionReservedWords = ['_verb', '_object', '_subject']

function verbPhrase(action, tense='simple_present') {
  let vp = tenses[tense](action)

  if(action._object)
    vp = sub("_ _", vp, action._object)

  for(var prep in action) {
    if(!actionReservedWords.includes(prep))
      vp = sub('_ _ _', vp, prep, action[prep])
  }

  return vp
}

function anyTenseRegex(verb) {
  let action = {_verb:verb, _subject:'_subject'}
  let forms = []
  for(var i in tenses) {
    let form = tenses[i](action)
    if(form.isSubstitution)
      form = form.getRegex()
    forms.push(form)
  }

  return regOps.or(...forms)
}

const tenses = {
  simple_present(action) {
    let person = getPerson(action._subject)
    return sub(
      "_ _",
      action._subject,
      conjugate(action._verb, person)
    )
  },

  present_continuous(action) {
    let person = getPerson(action._subject)
    return sub(
      "_ _ _",
      action._subject,
      conjugate('be', person),
      conjugate(action._verb, GERUND)
    )
  },

  simple_past(action) {
    let person = getPerson(action._subject)
    return sub(
      '_ _',
      action._subject,
      conjugate(action._verb, PAST_TENSE)
    )
  },

  past_continuous(action) {
    let person = getPerson(action._subject)
    return sub(
      '_ _ _',
      action._subject,
      conjugate('were', person),
      conjugate(action._verb, GERUND)
    )
  },

  present_perfect(action) {
    let person = getPerson(action._subject)
    return sub(
      '_ _ _',
      action._subject,
      conjugate('have', person),
      conjugate(action._verb, PAST_PARTICIPLE)
    )
  },

  present_perfect_continuous(action) {
    let person = getPerson(action._subject)
    return sub(
      '_ _ been _',
      action._subject,
      conjugate('have', person),
      conjugate(action._verb, GERUND)
    )
  },

  past_perfect(action) {
    let person = getPerson(action._subject)
    return sub(
      '_ _ _',
      action._subject,
      conjugate('have', person),
      conjugate(action._verb, PAST_PARTICIPLE)
    )
  },

  past_perfect_continuous(action) {
    return sub(
      '_ had been _',
      action._subject,
      conjugate(action._verb, GERUND)
    )
  },

  future_perfect(action) { // we will have verbed
    return sub(
      '_ will have _',
      action._subject,
      conjugate(action._verb, PAST_PARTICIPLE)
    )
  },

  // Future Perfect Continuous ("you will have been studying for five years")
  future_perfect_continuous(action) {
    return sub(
      '_ will have been _',
      action._subject,
      conjugate(action._verb, GERUND)
    )
  },

  // Simple Future ("They will go to Italy next week.")
  simple_future(action) {
    return sub(
      '_ will _',
      action._subject,
      action._verb,
    )
  },

  // Future Continuous ("I will be travelling by train.")
  future_continuous({_subject, _verb}) {
    return sub(
      '_ will be _',
      _subject,
      conjugate(_verb, GERUND)
    )
  },

  imperative({_verb}) {
    return sub(_verb)
  },

  negative_possible_present({_subject, _verb}) {
    return sub('_ cannot _', _subject, _verb)
  },
  negative_possible_past({_subject, _verb}) {
    return sub('_ could not _', _subject, _verb)
  }
}

module.exports = verbPhrase
verbPhrase.tenses = tenses
verbPhrase.anyTenseRegex = anyTenseRegex
