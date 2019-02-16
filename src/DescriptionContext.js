class DescriptionContext {
  constructor() {
    this.refHistory = [] // list of references.
    // Eg/ {noumenon: [Noumenon], str:'blah'}
    this.me = null // who is the first person
    this.you = null // who is the second person
  }

  log(noumenon, str) {
    // log a reference to the history
    this.refHistory.push({noumenon: noumenon, ref:str})
    console.log(this)
  }

  get it() {
    for(let i=this.refHistory.length-1; i>=0; --i) {
      let noum = this.refHistory[i].noumenon
      if(!noum.isPerson) {
        return noum
      }
    }
  }
}
module.exports = DescriptionContext
