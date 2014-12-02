//A plane represented by a point and a normal vector perpendicular to the plane's surface.
//
//Methematical construct not a 3d geometry mesh.

//## Example use
//      var plane = new Plane(new Vec3(0, 0, 0), new Vec3(0, 1, 0))
//
//      var projectedPoint = plane.project(new Vec3(1,2,3));

//## Reference

var Vec2 = require('./Vec2');
var Vec3 = require('./Vec3');

//### Plane(point, normal)
//Create plane at given point and normal  
//`point` - *{ Vec3 }*  
//`normal` - *{ Vec3 }*  
function Plane(point, normal) {
  this.point = point;
  this.normal = normal;
  this.u = new Vec3(); //?
  this.v = new Vec3(); //?
  this.updateUV();
}

//### set(point, normal)
//`point` - *{ Vec3 }*  
//`normal` - *{ Vec3 }*  
Plane.prototype.set = function(point, normal) {
  this.point = point;
  this.normal = normal;
  this.updateUV();
}

//### setPoint(point)
//`point` - *{ Vec3 }*  
Plane.prototype.setPoint = function(point) {
  this.point = point;
  this.updateUV();
}

//### setNormal(normal)
//`normal` - *{ Vec3 }*  
Plane.prototype.setNormal = function(normal) {
  this.normal = normal;
  this.updateUV();
}

//### project(p)
//Projects point onto the plane  
//`p` - a point to project*{ Vec3 }*  
Plane.prototype.project = function(p) {
  var D = Vec3.create().asSub(p, this.point);
  var scale = D.dot(this.normal);
  var scaled = this.normal.clone().scale(scale);
  var projected = p.clone().sub(scaled);
  return projected;
}

//### intersectRay(ray)  
//Test ray plane intersection  
//`ray` - *{ Ray }*  
//Returns array with one element - the intersection point, or empty array if the ray is parallel to the plane  
Plane.prototype.intersectRay = function(ray) {
  return ray.hitTestPlane(this.point, this.normal)[0];
}

//### rebase(p)  
//Represent 3d point on the plane in 2d coordinates  
//`p` - point *{ Vec3 }*  
Plane.prototype.rebase = function(p) {
  var diff = p.dup().sub(this.point);
  var x = this.u.dot(diff);
  var y = this.v.dot(diff);
  return new Vec2(x, y);
}

//## Internal methods

//### updateUV
//Updates interal uv coordinates for expressing 3d on the plane points as 2d
Plane.prototype.updateUV = function() {
  if (Math.abs(this.normal.x) > Math.abs(this.normal.y)) {
    var invLen = 1 / Math.sqrt(this.normal.x * this.normal.x + this.normal.z * this.normal.z);
    this.u.set( this.normal.x * invLen, 0, -this.normal.z * invLen);
  }
  else {
    var invLen = 1 / Math.sqrt(this.normal.y * this.normal.y + this.normal.z * this.normal.z);
    this.u.set( 0, this.normal.z * invLen, -this.normal.y * invLen);
  }

  this.v.setVec3(this.normal).cross(this.u);
}

module.exports = Plane;