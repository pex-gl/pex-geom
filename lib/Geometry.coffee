Vec2 = require('./Vec2')
Vec3 = require('./Vec3')
Vec4 = require('./Vec4')

class Geometry
  constructor: ({vertices, normals, texCoords, tangents, colors, indices, edges, faces}) ->
    vertices ?= true
    normals ?= false
    texCoords ?= false
    tangents ?= false
    colors ?= false
    indices ?= false
    edges ?= false
    faces ?= true

    @attribs = {}

    @addAttrib('vertices', 'position', vertices, false) if vertices
    @addAttrib('normals', 'normal', normals, false) if normals
    @addAttrib('texCoords', 'texCoord', texCoords, false) if texCoords
    @addAttrib('tangents', 'tangent', tangents, false) if tangents
    @addAttrib('colors', 'color', colors, false) if colors
    @addIndices(indices) if indices
    @addEdges(edges) if edges
    @addFaces(faces) if faces

  addAttrib: (propertyName, attributeName, data=null, dynamic=false) ->
    @[propertyName] = if data and data.length then data else []
    @[propertyName].name = attributeName
    @[propertyName].dirty = true
    @[propertyName].dynamic = dynamic
    @attribs[propertyName] = @[propertyName]
    this

  addFaces: (data=null, dynamic=false) ->
    @faces = if data and data.length then data else []
    @faces.dirty = true
    @faces.dynamic = false
    this

  addEdges: (data=null, dynamic=false) ->
    @edges = if data and data.length then data else []
    @edges.dirty = true
    @edges.dynamic = false
    this

  addIndices: (data=null, dynamic=false) ->
    @indices = if data and data.length then data else []
    @indices.dirty = true
    @indices.dynamic = false
    this

  isDirty: (attibs) ->
    dirty = false
    dirty ||= @faces && @faces.dirty
    dirty ||= @edges && @edges.dirty
    for attribAlias, attrib of @attribs
      dirty ||= attrib.dirty
    return dirty

  addEdge: (a, b) ->
    @addEdges() if !@edges
    @edgeHash = [] if !@edgeHash
    ab = a + '_' + b
    ba = b + '_' + a
    if !@edgeHash[ab] && !@edgeHash[ba]
      @edges.push([a, b])
      @edgeHash[ab] = @edgeHash[ba] = true

  computeEdges: () ->
    if @edges then @edges.length = 0 else @edges = []
    if @faces && @faces.length
      for face in @faces
        if face.length == 3
          @addEdge(face[0], face[1])
          @addEdge(face[1], face[2])
          @addEdge(face[2], face[0])
        if face.length == 4
          @addEdge(face[0], face[1])
          @addEdge(face[1], face[2])
          @addEdge(face[2], face[3])
          @addEdge(face[3], face[0])
    else
      for i in [0..@vertices.length-1] by 3
        a = i
        b = i + 1
        c = i + 2
        @addEdge(a, b)
        @addEdge(b, c)
        @addEdge(c, a)

  computeSmoothNormals: () ->
    if !this.faces
      throw 'Geometry[2]omputeSmoothNormals no faces found'
    if !this.normals
      @addAttrib('normals', 'normal', null, false)

    count = []

    @vertices.forEach (v, i) =>
      @normals.push(new Vec3(0, 0, 0))
      count[i] = 0

    #assume triangles for now
    @faces.forEach (f) =>
      a = @vertices[f[0]]
      b = @vertices[f[1]]
      c = @vertices[f[2]]
      ab = Vec3.create().asSub(b, a).normalize()
      ac = Vec3.create().asSub(c, a).normalize()
      n = Vec3.create().asCross(ab, ac)

      @normals[f[0]].add(n)
      count[f[0]]++
      @normals[f[1]].add(n)
      count[f[1]]++
      @normals[f[2]].add(n)
      count[f[2]]++

    @normals.forEach (n, i) ->
      n.scale(1 / count[i])

module.exports = Geometry


