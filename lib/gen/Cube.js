var Vec2 = require('../Vec2');
var Vec3 = require('../Vec3');
var Geometry = require('../Geometry');

function Cube(sx, sy, sz, nx, ny, nz) {
  sx = sx != null ? sx : 1;
  sy = sy != null ? sy : sx != null ? sx : 1;
  sz = sz != null ? sz : sx != null ? sx : 1;
  nx = nx || 1;
  ny = ny || 1;
  nz = nz || 1;

  Geometry.call(this, { vertices: true, normals: true, texCoords: true, faces: true });

  var vertices = this.vertices;
  var texCoords = this.texCoords;
  var normals = this.normals;
  var faces = this.faces;

  var vertexIndex = 0;
  makePlane = function(u, v, w, su, sv, nu, nv, pw, flipu, flipv) {
    var vertShift = vertexIndex;
    for (var j=0; j<=nv; j++) {
      for (var i=0; i<=nu; i++) {
        vert = vertices[vertexIndex] = Vec3.create();
        vert[u] = (-su / 2 + i * su / nu) * flipu;
        vert[v] = (-sv / 2 + j * sv / nv) * flipv;
        vert[w] = pw;
        normal = normals[vertexIndex] = Vec3.create();
        normal[u] = 0;
        normal[v] = 0;
        normal[w] = pw / Math.abs(pw);
        texCoord = texCoords[vertexIndex] = Vec2.create();
        texCoord.x = i / nu;
        texCoord.y = 1.0 - j / nv;
        ++vertexIndex;
      }
    }
    for (var j=0; j<=nv-1; j++) {
      for (var i=0; i<=nu-1; i++) {
        var n = vertShift + j * (nu + 1) + i;
        faces.push([n, n + nu + 1, n + nu + 2, n + 1]);
      }
    }
  }

  makePlane('x', 'y', 'z', sx, sy, nx, ny, sz / 2, 1, -1);
  makePlane('x', 'y', 'z', sx, sy, nx, ny, -sz / 2, -1, -1);
  makePlane('z', 'y', 'x', sz, sy, nz, ny, -sx / 2, 1, -1);
  makePlane('z', 'y', 'x', sz, sy, nz, ny, sx / 2, -1, -1);
  makePlane('x', 'z', 'y', sx, sz, nx, nz, sy / 2, 1, 1);
  makePlane('x', 'z', 'y', sx, sz, nx, nz, -sy / 2, 1, -1);
}

Cube.prototype = Object.create(Geometry.prototype);

module.exports = Cube;
