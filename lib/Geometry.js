var Vec3 = require('./Vec3');

//where does this should go? geom.Utils expanded to geom?
function centroid(points) {
  var n = points.length;
  var center = points.reduce(function(center, p) {
    return center.add(p);
  }, new Vec3(0, 0, 0));
  center.scale(1 / points.length);
  return center;
}

function edgeLoop(edge, cb) {
  var curr = edge;

  var i = 0;
  do {
    cb(curr, i++);
    curr = next(curr);
  }
  while(curr != edge);
}

function vertexEdgeLoop(edge, cb) {
  var curr = edge;

  do {
    cb(curr);
    curr = prev(curr).opposite;
  }
  while(curr != edge);
}

function next(edge) {
  return edge.face.halfEdges[(edge.slot + 1) % edge.face.length]
}

function prev(edge) {
  return edge.face.halfEdges[(edge.slot - 1 + edge.face.length) % edge.face.length]
}

function elements(list, indices) {
  return indices.map(function(i) { return list[i]; })
}

function move(a, b, t) {
  return b.dup().sub(a).normalize().scale(t).add(a);
}

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

Geometry.prototype.generateSurfacePoints = function(points) {

    var faceAreas = [];
    var triangles = [];

    for (var k=0, length=this.faces.length; k<length; k++) {

        var triangle = {};

        var AVertIndex = this.faces[k][0];
        var BVertIndex = this.faces[k][1];
        var CVertIndex = this.faces[k][2];

        var A = this.vertices[AVertIndex];
        var B = this.vertices[BVertIndex];
        var C = this.vertices[CVertIndex];

        var AB = B.dup().sub(A);
        var AC = C.dup().sub(A);

        var cross = AB.cross(AC);
        var area = 0.5 * Math.sqrt(cross.x * cross.x + cross.y * cross.y + cross.z * cross.z);

        triangle.A = A;
        triangle.B = B;
        triangle.C = C;
        triangles.push(triangle);

        faceAreas.push(area);

    }

    var min = Math.min.apply( Math, faceAreas );
    var ratios = faceAreas.map(function(area) {
        return Math.ceil(area / min);
    });

    var chanceIndexes = [];
    ratios.forEach(function(ratio, i) {
        for (var k=0;k<ratio;k++) {
            chanceIndexes.push(i);
        }
    });

    var generatedPoints = [];
    for (var i=0; i<points; i++) {

        var randomIndex = Math.ceil(Math.random() * chanceIndexes.length) - 1;
        var triangle = triangles[chanceIndexes[randomIndex]];
        var A = triangle.A.clone();
        var B = triangle.B.clone();
        var C = triangle.C.clone();

        var u = Math.random();
        var v = Math.random();

        if ((u + v) > 1) {
            u = 1 - u;
            v = 1 - v;
        }

        var w = 1 - (u + v);

        var newA = A.dup().scale(u);
        var newB = B.dup().scale(v);
        var newC = C.dup().scale(w);

        var s = newA.add(newB).add(newC);

        generatedPoints.push(s);

    }

    return generatedPoints;
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
    this.edgeHash = {};
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
    this.edgeHash = null;
    this.edges.length = 0;
  }

  if (this.faces && this.faces.length) {
    this.faces.forEach(function(face) {
      for(var i=0; i<face.length; i++) {
        this.addEdge(face[i], face[(i+1)%face.length]);
      }
    }.bind(this));
  }
  else {
    for (var i=0; i<this.vertices.length-1; i++) {
      this.addEdge(i, i+1);
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

  if (this.normals.length > this.vertices.length) {
    this.normals.length = vertices.length;
  }
  else {
    while (this.normals.length < this.vertices.length) {
      this.normals.push(new Vec3(0, 0, 0));
    }
  }

  var count = [];
  this.vertices.forEach(function(v, i) {
    count[i] = 0;
  }.bind(this));

  var ab = new Vec3();
  var ac = new Vec3();
  var n = new Vec3();

  this.faces.forEach(function(f) {
    var a = this.vertices[f[0]];
    var b = this.vertices[f[1]];
    var c = this.vertices[f[2]];
    ab.asSub(b, a).normalize();
    ac.asSub(c, a).normalize();
    n.asCross(ab, ac);
    for(var i=0; i<f.length; i++) {
      this.normals[f[i]].add(n);
      count[f[i]]++;
    }
  }.bind(this));

  this.normals.forEach(function(n, i) {
    n.normalize();
  });
};

Geometry.prototype.toFlatGeometry = function() {
  var g = new Geometry({ vertices: true, faces: true });

  var vertices = this.vertices;

  this.faces.forEach(function(face) {
    var newFace = [];
    face.forEach(function(vi) {
      newFace.push(g.vertices.length);
      g.vertices.push(vertices[vi]);
    });
    g.faces.push(newFace);
  });

  return g;
}

Geometry.prototype.clone = function() {
  var edges = null;
  var vertices = this.vertices.map(function(v) { return v.dup(); });
  var texCoords = this.texCoords ? this.texCoords.map(function(tc) { return tc.dup(); }) : null;
  var faces = this.faces.map(function(f) { return f.slice(0); });
  var edges = this.edges ? this.edges.map(function(e) { return e.slice(0); }) : null;
  return new Geometry({ vertices: vertices, texCoords: texCoords, faces: faces, edges: edges });
}

Geometry.prototype.triangulate = function() {
  var g = this.clone();
  g.faces = [];
  this.faces.forEach(function(face) {
    g.faces.push([face[0],face[1],face[2]]);
    for(var i=2; i<face.length-1; i++) {
      g.faces.push([face[0],face[i],face[i+1]]);
    }

  });
  return g;
}

//Based on ideas from
//http://fgiesen.wordpress.com/2012/04/03/half-edges-redux/
Geometry.prototype.computeHalfEdges = function() {
  var halfEdges = this.halfEdges = [];
  var faces = this.faces;

  faces.forEach(function(face, faceIndex) {
    face.halfEdges = [];
    face.forEach(function(vertexIndex, i) {
      var v0 = vertexIndex;
      var v1 = face[(i + 1) % face.length];
      var halfEdge = {
        edgeIndex: halfEdges.length,
        face: face,
        faceIndex: faceIndex,
        //vertexIndex: vertexIndex,
        slot: i,
        opposite: null,
        v0: Math.min(v0, v1),
        v1: Math.max(v0, v1)
      };
      face.halfEdges.push(halfEdge);
      halfEdges.push(halfEdge);
    });
  });

  halfEdges.sort(function(a, b) {
    if (a.v0 > b.v0) return 1;
    else if (a.v0 < b.v0) return -1;
    else if (a.v1 > b.v1) return 1;
    else if (a.v1 < b.v1) return -1;
    else return 0;
  });

  for(var i=1; i<halfEdges.length; i++) {
    var prev = halfEdges[i-1];
    var curr = halfEdges[i];
    if (prev.v0 == curr.v0 && prev.v1 == curr.v1) {
      prev.opposite = curr;
      curr.opposite = prev;
    }
  }

  return halfEdges;
}

Geometry.prototype.subdivideEdges = function() {
  var vertices = this.vertices;
  var faces = this.faces;

  var halfEdges = this.computeHalfEdges();

  var newVertices = vertices.map(function(v) { return v; });
  var newFaces = [];

  //edge points are an average of both edge vertices
  var edgePoints = [];
  //console.log('halfEdges', halfEdges.length, halfEdges.map(function(e) { return '' + (e.v0) + '-' + (e.v1); }));
  halfEdges.forEach(function(e) {
    if (!edgePoints[e.edgeIndex]) {
      var midPoint = centroid([
        vertices[e.face[e.slot]],
        vertices[next(e).face[next(e).slot]]
      ]);
      edgePoints[e.edgeIndex] = midPoint;
      edgePoints[e.opposite.edgeIndex] = midPoint;
      newVertices.push(midPoint);
    }
  });

  faces.forEach(function(face) {
    var newFace = [];
    edgeLoop(face.halfEdges[0], function(edge) {
      newFace.push(newVertices.indexOf(edgePoints[edge.edgeIndex]));
    });
    newFaces.push(newFace);
  });

  var visitedVertices = [];
  var verts = 0;
  halfEdges.forEach(function(e) {
    if (visitedVertices.indexOf(e.face[e.slot]) !== -1) return;
    visitedVertices.push(e.face[e.slot]);
    var neighborPoints = [];
    vertexEdgeLoop(e, function(edge) {
      neighborPoints.push(newVertices.indexOf(edgePoints[edge.edgeIndex]));
    });
    neighborPoints.forEach(function(point, i) {
      var nextPoint = neighborPoints[(i+1)%neighborPoints.length];
      newFaces.push([e.face[e.slot], point, nextPoint]);
    });
  });

  var g = new Geometry({ vertices: newVertices, faces: newFaces });
  g.computeEdges();

  return g;
}

Geometry.prototype.getFaceVertices = function(face) {
  return face.map(function(i) { return this.vertices[i]; }.bind(this));
}

//Non destructive Catmull-Clark subdivision
//Catmull-Clark subdivision for half-edge meshes
//Based on http://en.wikipedia.org/wiki/Catmull–Clark_subdivision_surface
//TODO: Study Doo-Sabin scheme for new vertices 1/n*F + 1/n*R + (n-2)/n*v
//http://www.cse.ohio-state.edu/~tamaldey/course/784/note20.pdf
//
//The shading part at the moment is that we put all vertices together at the end and have to manually
//calculate offsets at which each vertex, face and edge point end up
Geometry.prototype.catmullClark = function() {
  var vertices = this.vertices;
  var faces = this.faces;
  var halfEdges = this.computeHalfEdges();

  //face points are an average of all face points
  var facePoints = faces.map(this.getFaceVertices.bind(this)).map(centroid);

  //edge points are an average of both edge vertices and center points of two neighbor faces
  var edgePoints = [];
  halfEdges.forEach(function(e) {
    if (!edgePoints[e.edgeIndex]) {
      var midPoint = centroid([
        vertices[e.v0],
        vertices[e.v1],
        facePoints[e.faceIndex],
        facePoints[e.opposite.faceIndex]
      ]);
      edgePoints[e.edgeIndex] = midPoint;
      edgePoints[e.opposite.edgeIndex] = midPoint;
    }
  });

  //vertex points are and average of neighbor edges' edge points and neighbor faces' face points
  var vertexPoints = [];
  halfEdges.map(function(edge) {
    var vertexIndex = faces[edge.faceIndex][edge.slot];
    var vertex = vertices[vertexIndex];
    if (vertexPoints[vertexIndex]) return;
    var neighborFacePoints = [];
    //vertexEdgeLoop(edge).map(function(edge) { return facePoints[edge.faceIndex] } )
    //vertexEdgeLoop(edge).map(function(edge) { return edge.face.facePoint } )
    //extract(facePoints, vertexEdgeLoop(edge).map(prop('faceIndex'))
    var neighborEdgeMidPoints = [];
    vertexEdgeLoop(edge, function(edge) {
      neighborFacePoints.push(facePoints[edge.faceIndex]);
      neighborEdgeMidPoints.push(centroid([vertices[edge.v0], vertices[edge.v1]]));
    });
    var facesCentroid = centroid(neighborFacePoints);
    var edgesCentroid = centroid(neighborEdgeMidPoints);

    var n = neighborFacePoints.length;
    var v = new Vec3(0, 0, 0);
    v.add(facesCentroid);
    v.add(edgesCentroid.dup().scale(2));
    v.add(vertex.dup().scale(n - 3));
    v.scale(1/n);

    vertexPoints[vertexIndex] = v;
  });

  //create list of points for the new mesh
  //vertx poitns and face points are unique
  var newVertices = vertexPoints.concat(facePoints);

  //halfEdge mid points are not (each one is doubled)
  halfEdges.forEach(function(e) {
    if (e.added > -1) return;
    e.added = newVertices.length;
    e.opposite.added = newVertices.length;
    newVertices.push(edgePoints[e.edgeIndex]);
  })

  var newFaces = [];
  var newEdges = [];

  //construct new faces from face point, two edges mid points and a vertex between them
  faces.forEach(function(face, faceIndex) {
    var facePointIndex = faceIndex + vertexPoints.length;
    edgeLoop(face.halfEdges[0], function(edge) {
      var edgeMidPointsIndex = edge.added;
      var nextEdge = next(edge);
      var nextEdgeVertexIndex = face[nextEdge.slot];
      var nextEdgeMidPointIndex = nextEdge.added;
      newEdges.push([facePointIndex, edgeMidPointsIndex]);
      newEdges.push([edgeMidPointsIndex, nextEdgeVertexIndex]);
      newFaces.push([facePointIndex, edgeMidPointsIndex, nextEdgeVertexIndex, nextEdgeMidPointIndex])
    });
  });

  return new Geometry({ vertices: newVertices, faces: newFaces, edges: newEdges });
}

//Doo-Sabin subdivision as desribed in WIRE AND COLUMN MODELING
//http://repository.tamu.edu/bitstream/handle/1969.1/548/etd-tamu-2004A-VIZA-mandal-1.pdf  
Geometry.prototype.dooSabin = function(depth) {
  var vertices = this.vertices;
  var faces = this.faces;
  var halfEdges = this.computeHalfEdges();

  var newVertices = [];
  var newFaces = [];
  var newEdges = [];

  depth = depth || 0.1;

  var facePointsByFace = [];

  var self = this;

  faces.forEach(function(face, faceIndex) {
    var facePoints = facePointsByFace[faceIndex] = [];
    edgeLoop(face.halfEdges[0], function(edge) {
      var v = vertices[edge.face[edge.slot]];
      var p = centroid([
        v,
        centroid(elements(vertices, edge.face)),
        centroid(elements(vertices, [edge.v0, edge.v1])),
        centroid(elements(vertices, [prev(edge).v0, prev(edge).v1]))
      ]);
      facePoints.push(newVertices.length);
      newVertices.push(move(v, p, depth));
      //newVertices.push(p);
    });
    return facePoints;
  });

  //face face
  faces.forEach(function(face, faceIndex) {
    newFaces.push(facePointsByFace[faceIndex]);
  });

  halfEdges.forEach(function(edge, edgeIndex) {
    if (edge.edgeVisited) return;

    edge.edgeVisited = true;
    edge.opposite.edgeVisited = true;

    //edge face
    var e0 = edge;
    var e1 = next(e0.opposite);
    var e2 = e0.opposite;
    var e3 = next(e0);
    var newFace = [
      facePointsByFace[e0.faceIndex][e0.slot],
      facePointsByFace[e1.faceIndex][e1.slot],
      facePointsByFace[e2.faceIndex][e2.slot],
      facePointsByFace[e3.faceIndex][e3.slot]
    ];
    newFaces.push(newFace);
    newEdges.push([newFace[0], newFace[3]]);
    newEdges.push([newFace[1], newFace[2]]);
  });

  halfEdges.forEach(function(edge, edgeIndex) {
    if (edge.vertexVisited) return;

    //vertex face
    var vertexFace = [];
    vertexEdgeLoop(edge, function(e) {
      e.vertexVisited = true;
      vertexFace.push(facePointsByFace[e.faceIndex][e.slot])
    });
    newFaces.push(vertexFace)
    vertexFace.forEach(function(i, index) {
      newEdges.push([i, vertexFace[(index+1)%vertexFace.length]]);
    });
  });

  return new Geometry({ vertices: newVertices, faces: newFaces, edges: newEdges });
}

//Mesh wire modelling as described in
//http://repository.tamu.edu/bitstream/handle/1969.1/548/etd-tamu-2004A-VIZA-mandal-1.pdf  
Geometry.prototype.wire = function(edgeDepth, insetDepth) {
  insetDepth = (insetDepth != null) ? insetDepth : (edgeDepth || 0.1);
  edgeDepth = edgeDepth || 0.1;
  var newGeom = this.dooSabin(edgeDepth);
  newGeom.computeNormals();
  var halfEdges = newGeom.computeHalfEdges();
  var innerGeom = this.dooSabin(edgeDepth);
  innerGeom.computeNormals();

  //shrink the inner geometry
  innerGeom.vertices.forEach(function(v, vi) {
    v.sub(innerGeom.normals[vi].dup().scale(insetDepth));
  });

  //remove middle faces
  var cutFaces = newGeom.faces.splice(0, this.faces.length);
  innerGeom.faces.splice(0, this.faces.length);

  var vertexOffset = newGeom.vertices.length;

  //add inner vertices to new geom
  innerGeom.vertices.forEach(function(v, vi) {
    newGeom.vertices.push(v);
  });

  //add inner faces to new geom
  innerGeom.faces.forEach(function(f) {
    newGeom.faces.push(f.map(function(vi) {
      return vi + vertexOffset;
    }).reverse());
  });

  //add inner edges to new geom
  innerGeom.edges.forEach(function(e) {
    newGeom.edges.push(e.map(function(vi) {
      return vi + vertexOffset;
    }));
  });

  cutFaces.forEach(function(face) {
    edgeLoop(face.halfEdges[0], function(e) {
      var pe = prev(e);
      newGeom.faces.push([
        pe.face[pe.slot],
        e.face[e.slot],
        e.face[e.slot] + vertexOffset,
        pe.face[pe.slot] + vertexOffset
      ]);

      newGeom.edges.push([
        pe.face[pe.slot],
        pe.face[pe.slot] + vertexOffset
      ]);

      newGeom.edges.push([
        e.face[e.slot],
        e.face[e.slot] + vertexOffset
      ]);
    });
  });

  return newGeom;
}

Geometry.prototype.extrude = function(height, faceIndices, shrink) {
  height = height || 0.1;
  shrink = shrink || 0;
  if (!faceIndices) faceIndices = this.faces.map(function(face, faceIndex) { return faceIndex; });
  var g = this.clone();
  var halfEdges = g.computeHalfEdges();

  var ab = new Vec3();
  var ac = new Vec3();
  var faceNormal = new Vec3();
  var tmp = new Vec3();

  faceIndices.forEach(function(faceIndex) {
    var face = g.faces[faceIndex];
    var faceVerts = elements(g.vertices, face);
    var faceTexCoords = g.texCoords ? elements(g.texCoords, face) : null;

    var a = faceVerts[0];
    var b = faceVerts[1];
    var c = faceVerts[2];
    ab.asSub(b, a).normalize();
    ac.asSub(c, a).normalize();
    faceNormal.asCross(ab, ac).normalize();
    faceNormal.scale(height);

    var newVerts = faceVerts.map(function(v) {
      return v.dup().add(faceNormal);
    });

    var newVertsIndices = [];

    newVerts.forEach(function(nv) {
      newVertsIndices.push(g.vertices.length);
      g.vertices.push(nv);
    });

    if (faceTexCoords) {
      var newTexCoords = faceTexCoords.map(function(tc) {
        return tc.dup();
      });

      newTexCoords.forEach(function(tc) {
        g.texCoords.push(tc);
      });
    }

    if (shrink) {
      var c = centroid(newVerts);
      newVerts.forEach(function(nv) {
        tmp.asSub(c, nv);
        tmp.scale(shrink);
        nv.add(tmp);
      })
    }

    //add new face for each extruded edge
    edgeLoop(face.halfEdges[0], function(e) {
      g.faces.push([
        face[e.slot],
        face[next(e).slot],
        newVertsIndices[next(e).slot],
        newVertsIndices[e.slot]
      ]);
    });

    //add edges
    if (g.edges) {
      newVertsIndices.forEach(function(i, index) {
        g.edges.push([i, face[index]]);
      });
      newVertsIndices.forEach(function(i, index) {
        g.edges.push([i, newVertsIndices[(index+1)%newVertsIndices.length]]);
      });
    }

    //push the old face outside
    newVertsIndices.forEach(function(nvi, i) {
      face[i] = nvi;
    });
  });

  return g;
}

module.exports = Geometry;
