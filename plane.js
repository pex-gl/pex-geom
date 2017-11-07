var Ray = require('./Ray');
var Vec3 = require('pex-math/Vec3');

var tmp = Vec3.create();

function create(){
    return [[0,0,0],[0,1,0]];
}

function getRayIntersection(plane,ray,out){
    return Ray.hitTestPlane(ray, plane[0], plane[1], out);
}


function side(plane, point) {
    var planePoint = plane[0];
    var planeNormal = plane[1];
    Vec3.set(tmp, planePoint);
    Vec3.sub(tmp, point);
    Vec3.normalize(tmp);
    var dot = Vec3.dot(tmp, planeNormal);
    if (dot > 0) return 1;
    if (dot < 0) return -1;
    return 0;
}

/**
 * [Plane description]
 * @type {Object}
 */
var Plane = {
    /**
     * [create description]
     * @type {Function}
     */
    create : create,
    /**
     * [create description]
     * @type {Function}
     */
    getRayIntersection : getRayIntersection,
    /**
     * [create description]
     * @type {Function}
     */
    side: side
};

module.exports = Plane;
