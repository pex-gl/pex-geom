Vec2 = require('../Vec2')
Vec3 = require('../Vec3')
Geometry = require('../Geometry')

class LineBuilder extends Geometry
  constructor: () ->
    super({vertices:true, colors:true})

  addLine: (a, b, colorA, colorB) ->
    colorA = colorA || {r: 1, g: 1, b: 1, a: 1}
    colorB = colorB || colorA

    @vertices.push(Vec3.create().copy(a))
    @vertices.push(Vec3.create().copy(b))

    @colors.push(colorA) #Color.create().copy(colorA) # trying to avoid color dependency
    @colors.push(colorB) #Color.create().copy(colorB)

    @vertices.dirty = true
    @colors.dirty = true

  addCross: (pos, size, color) ->
    size = size || 0.1
    halfSize = size / 2

    color = color || {r: 1, g: 1, b: 1, a: 1}

    @vertices.push(Vec3.create().set(pos.x - halfSize, pos.y, pos.z))
    @vertices.push(Vec3.create().set(pos.x + halfSize, pos.y, pos.z))
    @vertices.push(Vec3.create().set(pos.x, pos.y - halfSize, pos.z))
    @vertices.push(Vec3.create().set(pos.x, pos.y + halfSize, pos.z))
    @vertices.push(Vec3.create().set(pos.x, pos.y, pos.z - halfSize))
    @vertices.push(Vec3.create().set(pos.x, pos.y, pos.z + halfSize))

    @colors.push(color) #Color.create().copy(color)
    @colors.push(color) #Color.create().copy(color)
    @colors.push(color) #Color.create().copy(color)
    @colors.push(color) #Color.create().copy(color)
    @colors.push(color) #Color.create().copy(color)
    @colors.push(color) #Color.create().copy(color)

  reset: () ->
    @vertices.length = 0
    @colors.length = 0

    @vertices.dirty = true
    @colors.dirty = true

module.exports = LineBuilder
