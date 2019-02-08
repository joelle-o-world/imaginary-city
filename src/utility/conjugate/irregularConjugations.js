// list of irregular verbs with their conjugations.
// (indexed by infinitive)

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

module.exports = {
  // be IS THIS EVEN A VERB?
  be: {
    1: 'am', 2:'are', 3:'is', 4:'are', 5:'are', 6:'are', 7:'being', 8:'been',
    9:'was',
  },

  say: {8:'said', 9:'said'},

  make: {8: 'made', 9: 'made'},
  go:   {8: 'gone', 9: 'went'},
  take: {8: 'taken',9: 'took'},
  come: {8: 'come', 9: 'came'},
  see: {7: 'seeing', 8:'seen', 9:'saw'},
  know: {8: 'known', 9:'knew'},
  get: {8:'got', 9:'got'},
  run: {8:'run', 9:'ran'},
  were: {1:'was', 3:'was'}, // this is a cludge and i know it
  have: {3:'has', 8:'had', 9:"had"}
  // give
  // find
  // think
  // tell
  // become
  // show
  // leave
  // feel
  // put
  // bring
  // begin
  // keep
  // hold
  // write
  // stand
  // hear
  // let
  // mean
  // set
  // meet
  // pay
  // sit
  // speak
  // lie
  // lead
  // read
  // grow
  // lose
  // fall
  // send
  // build
  // understood
  // draw
  // break
  // spend
  // cut
  // rise
  // drive
  // buy
  // wear
  // choose

  // to shit

}
