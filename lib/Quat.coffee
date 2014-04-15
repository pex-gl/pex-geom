kEpsilon = Math.pow(2, -24)

Mat4 = require('./Mat4')

class Quat
  @count: 0

  constructor: (@x=0, @y=0, @z=0, @w=1) ->
    Quat.count++

  @create: (x, y, z, w) ->
    new Quat(x, y, z, w)

  identity: () ->
    @set(0, 0, 0, 1)
    this

  equals: (q, tolerance=0.0000001) ->
    (Math.abs(q.x - @x) <= tolerance) && (Math.abs(q.y - @y) <= tolerance) && (Math.abs(q.z - @z) <= tolerance) && (Math.abs(q.w - @w) <= tolerance)

  hash: () ->
    return 1 * @x + 12 * @y + 123 * @z + 1234 * @w

  copy: (q) ->
    @x = q.x
    @y = q.y
    @z = q.z
    @w = q.w
    this

  clone: () ->
    new Quat(@x, @y, @z, @w)

  dup: () ->
    @clone()

  setAxisAngle: (v, a) ->
    a = a * 0.5
    s = Math.sin( a / 180 * Math.PI )
    @x = s * v.x
    @y = s * v.y
    @z = s * v.z
    @w = Math.cos( a / 180 * Math.PI)
    this

  setQuat: (q) ->
    @x = q.x
    @y = q.y
    @z = q.z
    @w = q.w
    this

  set: (x, y, z, w) ->
    @x = x
    @y = y
    @z = z
    @w = w
    this

  asMul: (p, q) ->
    px = p.x
    py = p.y
    pz = p.z
    pw = p.w
    qx = q.x
    qy = q.y
    qz = q.z
    qw = q.w

    @x  = px * qw + pw * qx + py * qz - pz * qy
    @y  = py * qw + pw * qy + pz * qx - px * qz
    @z  = pz * qw + pw * qz + px * qy - py * qx
    @w  = pw * qw - px * qx - py * qy - pz * qz

    this

  mul: (q) ->
    @asMul(this, q)
    this

  mul4: (x, y, z, w) ->
    ax = @x
    ay = @y
    az = @z
    aw = @w

    @x = w*ax + x*aw + y*az - z*ay
    @y = w*ay + y*aw + z*ax - x*az
    @z = w*az + z*aw + x*ay - y*ax
    @w = w*aw - x*ax - y*ay - z*az
    this

  length: () ->
    return Math.sqrt(@x*@x + @y*@y + @z*@z + @w*@w)

  normalize: () ->
    len = @length()

    if len > kEpsilon
      this.x /= len
      this.y /= len
      this.z /= len
      this.w /= len
    this

  toMat4: (out) ->
    xs = @x + @x
    ys = @y + @y
    zs = @z + @z
    wx = @w * xs
    wy = @w * ys
    wz = @w * zs
    xx = @x * xs
    xy = @x * ys
    xz = @x * zs
    yy = @y * ys
    yz = @y * zs
    zz = @z * zs

    m = out || new Mat4()

    return m.set4x4r(
      1 - (yy+zz), xy - wz,      xz + wy,     0,
      xy + wz,     1 - (xx+zz ), yz - wx,     0,
      xz - wy,     yz + wx,      1 - (xx+yy), 0,
      0,           0,            0,           1
    )

module.exports = Quat
