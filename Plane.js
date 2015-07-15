var Ray = require('./Ray');

function create(){
    return [[0,0,0],[0,1,0]];
}

function getRayIntersection(a,ray,out){
    return Ray.hitTestPlane(ray,a[0],a[1],out);
}

module.exports = {
    create : create,
    getRayIntersection : getRayIntersection
};