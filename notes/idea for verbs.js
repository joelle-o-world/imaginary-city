let action1 = {
  subject: "the spoon",
  object: "the table",
  verb: "sit", // always in infinitive form
  abverbs: ["quietly"],
}
/* this describes an action. A function could translate this into a sentence
    given other context as arguments, such as tense */

// another action
let action2 = {
  verb: "go", // always in infinitive
  subject: "Chloe", // subject refers to the noun phrase immediately preceding the verb
  to: "the shops", // semantically 'the shops' are the object here, but ww
  with: "John", // a list of legal prepositions will be needed
}

let action3 { // I eat cheese with a hat on my head
  verb: "eat",
  subject: "cheese",


}


// convert actions into verb phrases
translate(action1, {tense: "simple_present"}) => "The spoon sits quietly on the table"
translate(action2, {tense: "future_continuous"})
  => "Chloe will be going to the shops with John"
