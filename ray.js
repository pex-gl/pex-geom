var vec3 = require('pex-math/vec3')

var TEMP_VEC3_0 = vec3.create()
var TEMP_VEC3_1 = vec3.create()
var TEMP_VEC3_2 = vec3.create()
var TEMP_VEC3_3 = vec3.create()
var TEMP_VEC3_4 = vec3.create()
var TEMP_VEC3_5 = vec3.create()
var TEMP_VEC3_6 = vec3.create()
var TEMP_VEC3_7 = vec3.create()

var EPSILON = 0.000001
function create () {
  return [[0, 0, 0], [0, 0, 1]]
}

function hitTestTriangle (a, triangle, out) {
  var p0 = triangle[0]
  var p1 = triangle[1]
  var p2 = triangle[2]

  var origin = a[0]
  var direction = a[1]

  var u = vec3.sub(vec3.set(TEMP_VEC3_0, p1), p0)
  var v = vec3.sub(vec3.set(TEMP_VEC3_1, p2), p0)
  var n = vec3.cross(vec3.set(TEMP_VEC3_2, u), v)

  if (vec3.length(n) < EPSILON) {
    return -1
  }

  var w0 = vec3.sub(vec3.set(TEMP_VEC3_3, origin), p0)
  var a_ = -vec3.dot(n, w0)
  var b = vec3.dot(n, direction)

  if (Math.abs(b) < EPSILON) {
    if (a_ === 0) {
      return -2
    }
    return -3
  }

  var r = a_ / b
  if (r < -EPSILON) {
    return -4
  }

  var I = vec3.add(vec3.set(TEMP_VEC3_4, origin), vec3.scale(vec3.set(TEMP_VEC3_5, direction), r))

  var uu = vec3.dot(u, u)
  var uv = vec3.dot(u, v)
  var vv = vec3.dot(v, v)

  var w = vec3.sub(vec3.set(TEMP_VEC3_6, I), p0)

  var wu = vec3.dot(w, u)
  var wv = vec3.dot(w, v)

  var D = uv * uv - uu * vv

  var s = (uv * wv - vv * wu) / D

  if (s < -EPSILON || s > 1.0 + EPSILON) {
    return -5
  }

  var t = (uv * wu - uu * wv) / D

  if (t < -EPSILON || (s + t) > 1.0 + EPSILON) {
    return -6
  }

  out = out === undefined ? vec3.create() : out

  vec3.set(out, u)
  vec3.scale(out, s)
  vec3.add(out, vec3.scale(vec3.set(TEMP_VEC3_7, v), t))
  vec3.add(out, p0)

  return 1
}

function hitTestPlane (a, point, normal, out) {
  var origin = vec3.set(TEMP_VEC3_0, a[0])
  var direction = vec3.set(TEMP_VEC3_1, a[1])

  point = vec3.set(TEMP_VEC3_2, point)

  var dotDirectionNormal = vec3.dot(direction, normal)

  if (dotDirectionNormal === 0) {
    return -1
  }

  var t = vec3.dot(vec3.sub(point, origin), normal) / dotDirectionNormal

  if (t < 0) {
    return -2
  }

  out = out === undefined ? vec3.create() : out
  vec3.set(out, vec3.add(origin, vec3.scale(direction, t)))
  return 1
}

// http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms
function intersectsAABB (a, aabb) {
  var origin = a[0]
  var direction = a[1]

  var dirFracx = 1.0 / direction[0]
  var dirFracy = 1.0 / direction[1]
  var dirFracz = 1.0 / direction[2]

  var min = aabb[0]
  var max = aabb[1]

  var minx = min[0]
  var miny = min[1]
  var minz = min[2]

  var maxx = max[0]
  var maxy = max[1]
  var maxz = max[2]

  var t1 = (minx - origin[0]) * dirFracx
  var t2 = (maxx - origin[0]) * dirFracx

  var t3 = (miny - origin[1]) * dirFracy
  var t4 = (maxy - origin[1]) * dirFracy

  var t5 = (minz - origin[2]) * dirFracz
  var t6 = (maxz - origin[2]) * dirFracz

  var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6))
  var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6))

  return !(tmax < 0 || tmin > tmax)
}

module.exports = {
  create: create,
  hitTestTriangle: hitTestTriangle,
  hitTestPlane: hitTestPlane,
  intersectsAABB: intersectsAABB
}

