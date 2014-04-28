var Mat4 = require('./Mat4');
var kEpsilon = Math.pow(2, -24);

function Quat(x, y, z, w) {
  this.x = x != null ? x : 0;
  this.y = y != null ? y : 0;
  this.z = z != null ? z : 0;
  this.w = w != null ? w : 1;
}

Quat.create = function(x, y, z, w) {
  return new Quat(x, y, z, w);
};

Quat.prototype.identity = function() {
  this.set(0, 0, 0, 1);
  return this;
};

Quat.prototype.equals = function(q, tolerance) {
  if (tolerance == null) {
    tolerance = 0.0000001;
  }
  return (Math.abs(q.x - this.x) <= tolerance) && (Math.abs(q.y - this.y) <= tolerance) && (Math.abs(q.z - this.z) <= tolerance) && (Math.abs(q.w - this.w) <= tolerance);
};

Quat.prototype.hash = function() {
  return 1 * this.x + 12 * this.y + 123 * this.z + 1234 * this.w;
};

Quat.prototype.copy = function(q) {
  this.x = q.x;
  this.y = q.y;
  this.z = q.z;
  this.w = q.w;
  return this;
};

Quat.prototype.clone = function() {
  return new Quat(this.x, this.y, this.z, this.w);
};

Quat.prototype.dup = function() {
  return this.clone();
};

Quat.prototype.setAxisAngle = function(v, a) {
  a = a * 0.5;
  var s = Math.sin(a / 180 * Math.PI);
  this.x = s * v.x;
  this.y = s * v.y;
  this.z = s * v.z;
  this.w = Math.cos(a / 180 * Math.PI);
  return this;
};

Quat.prototype.setQuat = function(q) {
  this.x = q.x;
  this.y = q.y;
  this.z = q.z;
  this.w = q.w;
  return this;
};

Quat.prototype.set = function(x, y, z, w) {
  this.x = x;
  this.y = y;
  this.z = z;
  this.w = w;
  return this;
};

Quat.prototype.asMul = function(p, q) {
  var px = p.x;
  var py = p.y;
  var pz = p.z;
  var pw = p.w;
  var qx = q.x;
  var qy = q.y;
  var qz = q.z;
  var qw = q.w;
  this.x = px * qw + pw * qx + py * qz - pz * qy;
  this.y = py * qw + pw * qy + pz * qx - px * qz;
  this.z = pz * qw + pw * qz + px * qy - py * qx;
  this.w = pw * qw - px * qx - py * qy - pz * qz;
  return this;
};

Quat.prototype.mul = function(q) {
  this.asMul(this, q);
  return this;
};

Quat.prototype.mul4 = function(x, y, z, w) {
  var ax = this.x;
  var ay = this.y;
  var az = this.z;
  var aw = this.w;
  this.x = w * ax + x * aw + y * az - z * ay;
  this.y = w * ay + y * aw + z * ax - x * az;
  this.z = w * az + z * aw + x * ay - y * ax;
  this.w = w * aw - x * ax - y * ay - z * az;
  return this;
};

Quat.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
};

Quat.prototype.normalize = function() {
  var len = this.length();
  if (len > kEpsilon) {
    this.x /= len;
    this.y /= len;
    this.z /= len;
    this.w /= len;
  }
  return this;
};

Quat.prototype.toMat4 = function(out) {
  var xs = this.x + this.x;
  var ys = this.y + this.y;
  var zs = this.z + this.z;
  var wx = this.w * xs;
  var wy = this.w * ys;
  var wz = this.w * zs;
  var xx = this.x * xs;
  var xy = this.x * ys;
  var xz = this.x * zs;
  var yy = this.y * ys;
  var yz = this.y * zs;
  var zz = this.z * zs;
  var m = out || new Mat4();
  return m.set4x4r(1 - (yy + zz), xy - wz, xz + wy, 0, xy + wz, 1 - (xx + zz), yz - wx, 0, xz - wy, yz + wx, 1 - (xx + yy), 0, 0, 0, 0, 1);
};



module.exports = Quat;
