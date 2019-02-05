const regOp = require("../utility/regex")
const interpretSpecialArray = require("./interpretSpecialArray")

let assignments = {
  refRegex(ctx = {}) {
    // article
    let reg = ctx.article || /the|a/

    // adjectives
    let adjs = this.adjs(ctx)
    if(adjs && adjs.length)
      reg = regOp.optionalConcatSpaced(
        reg,
        ...adjs,
      )
    // noun
    reg = regOp.concatSpaced(
      reg,
      this.nounRegex(ctx),
    )

    // preposition clauses
    let prepRegex = this.prepositionClauseRegex(ctx)
    if(prepRegex)
      reg = regOp.optionalConcatSpaced(
        reg,
        prepRegex
      )

    // or just use a proper noun
    let properNounRegex = this.properNounRegex(ctx)
    if(properNounRegex) {
      reg = regOp.or(
        reg,
        properNounRegex
      )
    }

    return reg
  },

  properNounRegex(ctx) {
    if(!this.properNouns || this.properNouns.length == 0)
      return null
    return regOp.or(
      ...interpretSpecialArray(this, this.properNouns, ctx)
    )
  },

  parseRegex(ctx={}) {
    ctx.mode == "parse"
    return this.refRegex(ctx)
  },

  prepositionClauseRegex(ctx) {
    let list = []
    for(var i in this.descriptorFunctions) {
      if(i == "adj")
        continue
      let descriptors = interpretSpecialArray(this, this.descriptorFunctions[i], ctx)
      if(descriptors.length) {
        let clauseRegex = regOp.concatSpaced(
          i,
          regOp.or(...descriptors)
        )
        list.push(clauseRegex)
      }
    }

    if(list.length)
      return regOp.or(...list)
    else return null
  },

  nounRegex(ctx) { // noun RegExp
    return regOp.or(...interpretSpecialArray(this, this.nouns, ctx))
  },
}

module.exports = Noumenon => Object.assign(Noumenon.prototype, assignments)
