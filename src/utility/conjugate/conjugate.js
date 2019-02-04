/*
  Given the infinitive form of an english verb, produce all other forms.

  People: (the following numbers are used to represent these persons)
    1. 1st person singular (I)
    2. 2nd person singular (You)
    3. 3rd person singular (he/she/it)
    4. 1st person plural (we)
    5. 2nd person plural (you)
    6. 3rd person plural (they)

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
    Maybe also include:
    - Zero conditional ("If ice gets hot it melts.")
    - Type 1 Conditional ("If he is late I will be angry.")
    - Type 2 Conditional ("If he was in Australia he would be getting up now.")
    - Type 3 Conditional ("She would have visited me if she had had time")
    - Mixed Conditional ("I would be playing tennis if I hadn't broken my arm.")
    - Gerund
    - Present participle
*/



function conjugateRegular(infinitive) {
  // ends in sibilance, 'ss', 'sh', 'x'
  // ends in 'e'
  // ends in short consonant eg/ 'chat', 'compel', 'chop'
  // default case
  return {
    infinitive: infinitive,
    thirdPerson: infinitive+'s',
    presentParticiple: infinitive+'ing',
    pastParticiple: infinitive+'ed',
  }
}
