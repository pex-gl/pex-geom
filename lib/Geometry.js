var Vec3 = require('./Vec3');

function Geometry(o) {
  o = o || {};
  this.attribs = {};

  if (o.vertices) this.addAttrib('vertices', 'position', o.vertices, false);
  if (o.normals) this.addAttrib('normals', 'normal', o.normals, false);
  if (o.texCoords) this.addAttrib('texCoords', 'texCoord', o.texCoords, false);
  if (o.tangents) this.addAttrib('tangents', 'tangent', o.tangents, false);
  if (o.colors) this.addAttrib('colors', 'color', o.colors, false);
  if (o.indices) this.addIndices(o.indices);
  if (o.edges) this.addEdges(o.edges);
  if (o.faces) this.addFaces(o.faces);
}

Geometry.prototype.addAttrib = function(propertyName, attributeName, data, dynamic) {
  if (data == null) {
    data = null;
  }
  if (dynamic == null) {
    dynamic = false;
  }
  this[propertyName] = data && data.length ? data : [];
  this[propertyName].name = attributeName;
  this[propertyName].dirty = true;
  this[propertyName].dynamic = dynamic;
  this.attribs[propertyName] = this[propertyName];
  return this;
};

Geometry.prototype.addFaces = function(data, dynamic) {
  if (data == null) {
    data = null;
  }
  if (dynamic == null) {
    dynamic = false;
  }
  this.faces = data && data.length ? data : [];
  this.faces.dirty = true;
  this.faces.dynamic = false;
  return this;
};

Geometry.prototype.addEdges = function(data, dynamic) {
  if (data == null) {
    data = null;
  }
  if (dynamic == null) {
    dynamic = false;
  }
  this.edges = data && data.length ? data : [];
  this.edges.dirty = true;
  this.edges.dynamic = false;
  return this;
};

Geometry.prototype.addIndices = function(data, dynamic) {
  if (data == null) {
    data = null;
  }
  if (dynamic == null) {
    dynamic = false;
  }
  this.indices = data && data.length ? data : [];
  this.indices.dirty = true;
  this.indices.dynamic = false;
  return this;
};

Geometry.prototype.isDirty = function(attibs) {
  var dirty = false;
  dirty || (dirty = this.faces && this.faces.dirty);
  dirty || (dirty = this.edges && this.edges.dirty);
  for (attribAlias in this.attribs) {
    var attrib = this.attribs[attribAlias];
    dirty || (dirty = attrib.dirty);
  }
  return dirty;
};

Geometry.prototype.addEdge = function(a, b) {
  if (!this.edges) {
    this.addEdges();
  }
  if (!this.edgeHash) {
    this.edgeHash = [];
  }
  var ab = a + '_' + b;
  var ba = b + '_' + a;
  if (!this.edgeHash[ab] && !this.edgeHash[ba]) {
    this.edges.push([a, b]);
    return this.edgeHash[ab] = this.edgeHash[ba] = true;
  }
};

Geometry.prototype.computeEdges = function() {
  if (!this.edges) {
    this.addEdges();
  }
  else {
    this.edges.length = 0;
  }

  if (this.faces && this.faces.length) {
    this.faces.forEach(function(face) {
      if (face.length === 3) {
        this.addEdge(face[0], face[1]);
        this.addEdge(face[1], face[2]);
        this.addEdge(face[2], face[0]);
      }
      else if (face.length === 4) {
        this.addEdge(face[0], face[1]);
        this.addEdge(face[1], face[2]);
        this.addEdge(face[2], face[3]);
        this.addEdge(face[3], face[0]);
      }
    }.bind(this));
  }
  else {
    for (var i=0; i<this.vertices.length; i+=3) {
      a = i;
      b = i + 1;
      c = i + 2;
      this.addEdge(a, b);
      this.addEdge(b, c);
      this.addEdge(c, a);
    }
  }
};

Geometry.prototype.computeNormals = function() {
  if (!this.faces) {
    throw 'Geometry[2]omputeSmoothNormals no faces found';
  }
  if (!this.normals) {
    this.addAttrib('normals', 'normal', null, false);
  }

  var count = [];
  this.vertices.forEach(function(v, i) {
    this.normals.push(new Vec3(0, 0, 0));
    count[i] = 0;
  }.bind(this));

  this.faces.forEach(function(f) {
    var a = this.vertices[f[0]];
    var b = this.vertices[f[1]];
    var c = this.vertices[f[2]];
    var ab = Vec3.create().asSub(b, a).normalize();
    var ac = Vec3.create().asSub(c, a).normalize();
    var n = Vec3.create().asCross(ab, ac);
    f.forEach(function(vi) {
      this.normals[vi].add(n);
      count[vi]++;
    }.bind(this));
  }.bind(this));

  this.normals.forEach(function(n, i) {
    n.scale(1 / count[i]);
  });
};

module.exports = Geometry;
