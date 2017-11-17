function create () {
  return [[Infinity, Infinity], [-Infinity, -Infinity]]
}

function zero () {
  return [[0, 0], [0, 0]]
}

function copy (a) {
  return [a[0].slice(0), a[1].slice()]
}

function set (a, b) {
  a[0][0] = b[0][0]
  a[0][1] = b[0][1]
  a[1][0] = b[1][0]
  a[1][1] = b[1][1]
  return a
}

function scale (a, n) {
  a[0][0] *= n
  a[0][1] *= n
  a[1][0] *= n
  a[1][1] *= n
  return a
}

function setSize (a, size) {
  a[1][0] = a[0][0] + size[0]
  a[1][1] = a[0][1] + size[1]
  return a
}

function getSize (a, out) {
  var width = getWidth(a)
  var height = getHeight(a)
  if (out === undefined) {
    return [width, height]
  }
  out[0] = width
  out[1] = height
  return out
}

function getWidth (a) {
  return a[1][0] - a[0][0]
}

function getHeight (a) {
  return a[1][1] - a[0][1]
}

function getAspectRatio (a) {
  return getWidth(a) / getHeight(a)
}

function setPosition (a, position) {
  var x = position[0]
  var y = position[1]

  a[0][0] = x
  a[0][1] = y
  a[1][0] = x + getWidth(a)
  a[1][1] = y + getHeight(a)
  return a
}

function getCenter (a, out) {
  var x = getWidth(a) * 0.5
  var y = getHeight(a) * 0.5
  if (out === undefined) {
    return [x, y]
  }
  out[0] = x
  out[1] = y
  return out
}

function containsPoint (a, p) {
  var x = p[0]
  var y = p[1]
  return x >= a[0][0] && x <= a[1][0] && y >= a[0][1] && y <= a[1][1]
}

function containsRect (a, b) {
  return containsPoint(a, b[0]) && containsPoint(a, b[1])
}

function includePoint (a, point) {
  var x = point[0]
  var y = point[1]
  var minx = a[0][0]
  var miny = a[0][1]
  var maxx = a[1][0]
  var maxy = a[1][1]

  a[0][0] = minx > x ? x : minx
  a[0][1] = miny > y ? y : miny
  a[1][0] = maxx < x ? x : maxx
  a[1][1] = maxy < y ? y : maxy

  return a
}

function includeRect (a, rect) {
  includePoint(a, rect[0])
  includePoint(a, rect[1])
  return a
}

function mapPoint (a, point) {
  var minx = a[0][0]
  var miny = a[0][1]
  var maxx = a[1][0]
  var maxy = a[1][1]
  var x = point[0]
  var y = point[1]

  point[0] = Math.max(minx, Math.min(x, maxx)) - minx
  point[1] = Math.max(miny, Math.min(y, maxy)) - miny
  return point
}

function clampPoint (a, point) {
  var minx = a[0][0]
  var miny = a[0][1]
  var maxx = a[1][0]
  var maxy = a[1][1]

  point[0] = Math.max(minx, Math.min(point[0], maxx))
  point[1] = Math.max(miny, Math.min(point[1], maxy))
  return point
}

function setEmpty (a) {
  a[0][0] = a[0][1] = Infinity
  a[1][0] = a[1][1] = -Infinity
  return a
}

function isEmpty (a) {
  return (a[0][0] > a[1][0]) || (a[0][1] > a[1][1])
}

function createFromPoints (points) {
  var r = create()
  for (var i = 0, l = points.length; i < l; i++) {
    includePoint(r, points[i])
  }

  return r
}

module.exports = {
  create: create,
  zero: zero,
  copy: copy,
  set: set,
  scale: scale,
  setSize: setSize,
  getSize: getSize,
  getAspectRatio: getAspectRatio,
  setPosition: setPosition,
  getCenter: getCenter,
  containsPoint: containsPoint,
  containsRect: containsRect,
  includePoint: includePoint,
  includeRect: includeRect,
  mapPoint: mapPoint,
  clampPoint: clampPoint,
  isEmpty: isEmpty,
  setEmpty: setEmpty,
  createFromPoints: createFromPoints
}

