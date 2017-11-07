var ray = require('./ray')
var vec3 = require('pex-math/vec3')

var tmp = vec3.create()

function create () {
  return [[0, 0, 0], [0, 1, 0]]
}

function getRayIntersection (p, r, out) {
  return ray.hitTestPlane(r, p[0], p[1], out)
}

function side (plane, point) {
  var planePoint = plane[0]
  var planeNormal = plane[1]
  vec3.set(tmp, planePoint)
  vec3.sub(tmp, point)
  vec3.normalize(tmp)
  var dot = vec3.dot(tmp, planeNormal)
  if (dot > 0) return 1
  if (dot < 0) return -1
  return 0
}

module.exports = {
  create: create,
  getRayIntersection: getRayIntersection,
  side: side
}

