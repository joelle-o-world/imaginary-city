const {randexp} = require("randexp")

let assignments = {

  getDescriptiveReference(ctx={}) {
    // return a noun phrase which refers to this noumenon
    ctx.mode = "generate"
    let reg = this.refRegex(ctx)
    let ret = randexp(reg)
    return ret

/*    // NEW VERSION::
    let numberOfAdjectives = 2

    // use noun phrase:
    let properNounRegex = this.properNounRegex()
    if(!properNounRegex) {
      // choose article
      let article = randexp(/a|the/)
      // choose adjectives
      let adjs = this.adjs().sort((a,b) => Math.random()*2-1)
        .slice(0, numberOfAdjectives)
      console.log("adjs:", adjs)
      // choose noun
      let noun = this.noun
      // choose preposition phrases


      return [].concat(article, ...adjs, noun).join(" ")
    } else
      return randexp(properNounRegex)
    // otherwise use proper noun*/
  },

  ref(ctx) {
    // quick alias for get getDescriptiveReference
    return this.getDescriptiveReference(ctx)
  },

}

module.exports = Noumenon => Object.assign(Noumenon.prototype, assignments)
