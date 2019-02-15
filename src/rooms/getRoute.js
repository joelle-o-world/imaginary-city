function getDistance(from, to) {
  let visited = [from]
  let distances = [0]

  for(var i=0; i<visited.length; i++) {
    let rooms = visited[i].accessibleRooms.filter(room => !visited.includes(room))
    let d = distances[i]+1
    for(var j=0; j<rooms.length; ++j) {
      if(rooms[j] == to)
        return d
      visited.push(rooms[j])
      distances.push(d)
    }
  }
  return Infinity
}

function explore(startingPoint) {
  let visited = [startingPoint]

  for(var i=0; i<visited.length; i++) {
    let rooms = visited[i].accessibleRooms.filter(room => !visited.includes(room))
    visited.push(...rooms)
  }

  return visited
}

function getRoute(A, B) {
  let visited = [B]
  let breadcrumbs = new Map()

  for(var i=0; i<visited.length; i++) {
    let rooms = visited[i].accessibleRooms.filter(room => !visited.includes(room))
    for(let r of rooms) {
      visited.push(r)
      breadcrumbs.set(r, visited[i])

      if(r == A) {
        let trace = r
        let route = [trace]
        while(trace=breadcrumbs.get(trace))
          route.push(trace)
        return route
      }
    }
  }

  return null
}
module.exports = getRoute
module.exports.explore = explore
module.exports.getDistance = getDistance
