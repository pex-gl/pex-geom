var Vec3 = require('pex-math/Vec3');

var TEMP_VEC3_0 = Vec3.create();
var TEMP_VEC3_1 = Vec3.create();
var TEMP_VEC3_2 = Vec3.create();

function create(){
    return [[0,0,0],[0,0,1]];
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

module.exports = {
    create : create,
    hitTestPlane : hitTestPlane
};