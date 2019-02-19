/*
  Find noumena which match a given noun-string by searching outwards from a
  given noumenon

  VOCAB:
    relationship, a connection between two noumena
    relation: A noumenon which is in a relationship
*/

function* immediateRelations(noum) { // noum: Starting point
  // generate all immediate related noumena, skipping neither duplicates or null

  // PHYSICAL OBJECT RELATIONS
  // - noum.location
  yield noum.location
  // check sub objects
  // - ...noum.containing
  if(noum.isPhysicalObject)
    for(let item of noum.locating)
      yield item

  // ROOM RELATIONS
  if(noum.isRoom) {
    // room contents
    for(let item of noum.contents)
      yield item
    // room doors
    for(let door of noum.doors)
      yield door
  }

  // DOOR RELATIONS
  if(noum.isDoor) {
    yield noum.A
    yield noum.B
  }
}
exports.immediateRelations = immediateRelations

function* filteredImmediateRelations(noum, yielded) {
  // filter immediate relations
  for(let relation of immediateRelations(noum)) {
    // skip relations which are null, or have already been checked
    if(!relation || yielded.includes(relation))
      continue

    yielded.push(relation)
    yield relation
  }
}

function* allRelations(noum, yielded=[noum], limit=Infinity) {
  // recursively return relations
  for(let i=0; i<yielded.length && yielded.length < limit; i++)
    for(let relation of filteredImmediateRelations(yielded[i], yielded))
      yield relation

}
exports.allRelations = allRelations

function getList(startingNoum, n=100) {
  let list = [startingNoum]
  for(let noum of allRelations(startingNoum, list, n))
    continue
  return list
}
exports.getList = getList

function* search(refString, startingPoint) {
  if(startingPoint.matchesRef(refString))
    yield startingPoint
  for(let noum of allRelations(startingPoint)) {
    if(noum.matchesRef(refString))
      yield noum
  }
}
exports.search = search

function firstMatch(refString, startingPoint) {
  let result = search(refString, startingPoint).next()
  if(result.value)
    return result.value
  else
    return null
}
exports.firstMatch = firstMatch
