function* imediatelyAudible(from) {
  // from itself
  yield {o: from, distance:1}

  // from.locating (with attenuations)
  for(let subObj of from.locating)
    yield {o: subObj, distance:1}


  // from.location
  yield {o:f rom.location, distance: 1}

  // if a room sounds through doors
  //if(from.isRoom)
}
