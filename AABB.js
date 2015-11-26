function create() {
    var min = [Infinity, Infinity, Infinity];
    var max = [-Infinity, -Infinity, -Infinity];
    return [min, max];
}

function set(a, b) {
    a[0][0] = b[0][0];
    a[0][1] = b[0][1];
    a[0][2] = b[0][2];
    a[1][0] = b[1][0];
    a[1][1] = b[1][1];
    a[1][2] = b[1][2];
}

function copy(b) {
    var a = create();
    set(a, b);
    return a;
}

function fromPoints(points) {
    var aabb = create();
    var min = aabb[0];
    var max = aabb[1];

    for(var i=0, len=points.length; i<len; i++) {
        var p = points[i];
        min[0] = Math.min(min[0], p[0]);
        min[1] = Math.min(min[1], p[1]);
        min[2] = Math.min(min[2], p[2]);
        max[0] = Math.max(max[0], p[0]);
        max[1] = Math.max(max[1], p[1]);
        max[2] = Math.max(max[2], p[2]);
    }

    return aabb;
}

function center(aabb, out) {
    if(out === undefined){
        out = [0, 0, 0];
    }
    out[0] = (aabb[0][0] + aabb[1][0])/2;
    out[1] = (aabb[0][1] + aabb[1][1])/2;
    out[2] = (aabb[0][2] + aabb[1][2])/2;
    return out;
}

function size(aabb, out) {
    if(out === undefined){
        out = [0, 0, 0];
    }
    out[0] = Math.abs(aabb[1][0] - aabb[0][0]);
    out[1] = Math.abs(aabb[1][1] - aabb[0][1]);
    out[2] = Math.abs(aabb[1][2] - aabb[0][2]);
    return out;
}

function isEmpty(aabb) {
    return (aabb[0][0] > aabb[1][0]) || (aabb[0][1] > aabb[1][1]) || (aabb[0][2] > aabb[1][2]);
}

function includeAABB(a, b) {
    if (isEmpty(a)) {
        set(a, b);
    }
    else if (isEmpty(b)) {
        //do nothing
    }
    else {
        a[0][0] = Math.min(a[0][0], b[0][0])
        a[0][1] = Math.min(a[0][1], b[0][1])
        a[0][2] = Math.min(a[0][2], b[0][2])
        a[1][0] = Math.max(a[1][0], b[1][0])
        a[1][1] = Math.max(a[1][1], b[1][1])
        a[1][2] = Math.max(a[1][2], b[1][2])
    }

    return a;
}

/**
 * [AABB description]
 * @type {Object}
 */
var AABB = {
    /**
     * [create description]
     * @return {[type]} [description]
     */
    create: create,

    /**
     * [set description]
     * @param {[type]} a [description]
     * @param {[type]} b [description]
     */
    set: set,
    /**
     * [copy description]
     * @type {[type]}
     */
    copy: copy,
    /**
     * [fromPoints description]
     * @type {[type]}
     */
    fromPoints: fromPoints,
    /**
     * [center description]
     * @type {[type]}
     */
    center: center,
    /**
     * [size description]
     * @type {[type]}
     */
    size: size,
    /**
     * AABB is empty if min > max
     * @param  {[type]}  aabb [description]
     * @return {Boolean}      [description]
     */
    isEmpty: isEmpty,
    /**
     * [includeAABB description]
     * @type {[type]}
     */
    includeAABB: includeAABB
};

module.exports = AABB;
