module.exports.Vec2 = require('./lib/Vec2');
module.exports.Vec3 = require('./lib/Vec3');
module.exports.Vec4 = require('./lib/Vec4');
module.exports.Mat4 = require('./lib/Mat4');
module.exports.Quat = require('./lib/Quat');
module.exports.Path = require('./lib/Path');
module.exports.Rect = require('./lib/Rect');
module.exports.Spline3 = require('./lib/Spline3');
module.exports.Spline2 = require('./lib/Spline2');
module.exports.Spline1 = require('./lib/Spline1');
module.exports.Ray = require('./lib/Ray');
module.exports.Plane = require('./lib/Plane');
module.exports.Geometry = require('./lib/Geometry');
module.exports.Random = require('./lib/Random');
module.exports.BoundingBox = require('./lib/BoundingBox');
module.exports.Triangle2 = require('./lib/Triangle2');
module.exports.Triangle3 = require('./lib/Triangle3');
module.exports.Octree = require('./lib/Octree');

//unpack Random methods to geom package
for(var funcName in module.exports.Random) {
  module.exports[funcName] = module.exports.Random[funcName];
}