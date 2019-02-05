const {randexp} = require("randexp")

let assignments = {

  getDescriptiveReference(ctx={}) {
    // return a noun phrase which refers to this noumenon
    ctx.mode = "generate"
    let reg = this.refRegex(ctx)
    let ret = randexp(reg)
    return ret
  },

  ref(ctx) {
    // quick alias for get getDescriptiveReference
    return this.getDescriptiveReference(ctx)
  },

}

module.exports = Noumenon => Object.assign(Noumenon.prototype, assignments)
