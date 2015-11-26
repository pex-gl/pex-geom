var Vec3 = require('pex-math/Vec3');

var TEMP_VEC3_0 = Vec3.create();
var TEMP_VEC3_1 = Vec3.create();
var TEMP_VEC3_2 = Vec3.create();
var TEMP_VEC3_3 = Vec3.create();
var TEMP_VEC3_4 = Vec3.create();
var TEMP_VEC3_5 = Vec3.create();
var TEMP_VEC3_6 = Vec3.create();
var TEMP_VEC3_7 = Vec3.create();

var EPSILON = 0.000001;

function create(){
    return [[0,0,0],[0,0,1]];
}

function hitTestTriangle3(a,p0,p1,p2,out){
    var origin    = a[0];
    var direction = a[1];

    var u = Vec3.sub(Vec3.set(TEMP_VEC3_0,p1),p0);
    var v = Vec3.sub(Vec3.set(TEMP_VEC3_1,p2),p0);
    var n = Vec3.cross(Vec3.set(TEMP_VEC3_2,u),v);

    if(Vec3.length(n) < EPSILON){
        return -1;
    }

    var w0 = Vec3.sub(Vec3.set(TEMP_VEC3_3,origin),p0);
    var a_ = -Vec3.dot(n,w0);
    var b  = Vec3.dot(n,direction);

    if(Math.abs(b) < EPSILON){
        if(a_ == 0){
            return -2;
        }
        return -3;
    }

    var r = a_ / b;
    if(r < -EPSILON){
        return -4;
    }

    var I = Vec3.add(Vec3.set(TEMP_VEC3_4,origin),Vec3.scale(Vec3.set(TEMP_VEC3_5,direction),r));

    var uu = Vec3.dot(u,u);
    var uv = Vec3.dot(u,v);
    var vv = Vec3.dot(v,v);

    var w = Vec3.sub(Vec3.set(TEMP_VEC3_6,I),p0);

    var wu = Vec3.dot(w,u);
    var wv = Vec3.dot(w,v);

    var D = uv * uv - uu * vv;

    var s = (uv * wv - vv * wu) / D;

    if (s < -EPSILON || s > 1.0 + EPSILON){
        return -5;
    }

    var t = (uv * wu - uu * wv) / D;

    if (t < -EPSILON || (s + t) > 1.0 + EPSILON) {
        return -6;
    }

    out = out === undefined ? Vec3.create() : out;

    Vec3.set(out,u);
    Vec3.scale(out,s);
    Vec3.add(out,Vec3.scale(Vec3.set(TEMP_VEC3_7,v),t));
    Vec3.add(out,p0);

    return 1;
}

function hitTestTriangle(a,triangle,out){
    return hitTestTriangle3(a,triangle[0],triangle[1],triangle[2],out);
}

function hitTestPlane(a,point,normal,out) {
    var origin    = Vec3.set(TEMP_VEC3_0,a[0]);
    var direction = Vec3.set(TEMP_VEC3_1,a[1]);

    point = Vec3.set(TEMP_VEC3_2,point);

    var dotDirectionNormal = Vec3.dot(direction,normal);

    if (dotDirectionNormal == 0) {
        return null;
    }

    var t = Vec3.dot(Vec3.sub(point,origin),normal) / dotDirectionNormal;

    if(t < 0){
        return null;
    }

    out = out === undefined ? Vec3.create() : out;
    return Vec3.set(out,Vec3.add(origin,Vec3.scale(direction,t)));
}

//http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms
function intersectsAABB(a,aabb){
    var origin    = a[0];
    var direction = a[1];

    var dirFracx = 1.0 / direction[0];
    var dirFracy = 1.0 / direction[1];
    var dirFracz = 1.0 / direction[2];

    var min  = aabb[0];
    var max  = aabb[1];

    var minx = min[0];
    var miny = min[1];
    var minz = min[2];

    var maxx = max[0];
    var maxy = max[1];
    var maxz = max[2];

    var t1 = (minx - origin[0]) * dirFracx;
    var t2 = (maxx - origin[0]) * dirFracx;

    var t3 = (miny - origin[1]) * dirFracy;
    var t4 = (maxy - origin[1]) * dirFracy;

    var t5 = (minz - origin[2]) * dirFracz;
    var t6 = (maxz - origin[2]) * dirFracz;

    var tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
    var tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));

    return !(tmax < 0 || tmin > tmax);
}

/**
 * [Ray description]
 * @type {Object}
 */
var Ray = {
    /**
     * [create description]
     * @type {[type]}
     */
    create : create,
    /**
     * [create description]
     * @type {[type]}
     */
    hitTestTriangle3 : hitTestTriangle3,
    /**
     * [create description]
     * @type {[type]}
     */
    hitTestTriangle  : hitTestTriangle,
    /**
     * [create description]
     * @type {[type]}
     */
    hitTestPlane     : hitTestPlane,
    /**
     * [create description]
     * @type {[type]}
     */
    intersectsAABB   : intersectsAABB
};

module.exports = Ray;
