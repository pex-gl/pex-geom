extend = require('extend')
Geometry = require('../Geometry')
Vec2 = require('../Vec2')
Vec3 = require('../Vec3')
Mat4 = require('../Mat4')
Quat = require('../Quat')
Spline3D = require('../Spline3D')
Path = require('../Path')
Spline1D = require('../Spline1D')
{ acos, PI, min } = Math

# Version history
# 1. Naive implementation
# https://gist.github.com/roxlu/2859605
# 2. Fixed twists
# http://www.lab4games.net/zz85/blog/2012/04/24/spline-extrusions-tubes-and-knots-of-sorts/
# http://www.cs.cmu.edu/afs/andrew/scs/cs/15-462/web/old/asst2camera.html

Spline3D.prototype.getTangentAt = (t) ->
  p = this.getPointAt(t)
  np = this.getPointAt(t + 0.01)
  v = Vec3.create().asSub(np, p).normalize()

EPSILON = 0.00001

class Loft extends Geometry
  constructor: (path, options) ->
    super({vertices:true, normals:true, texCoords:true, edges:true, faces:true})
    defaults = {
      numSteps: 200,
      numSegments: 8,
      r: 0.3
      shapePath: null,
      closed: false,
      xShapeScale: 1
      caps: false,
      initialNormal: null
    }

    path.samplesCount = 5000

    @options = options = extend(defaults, options)
    @shapePath = options.path || @makeShapePath(options.numSegments)

    @rfunc = @makeRadiusFunction(options.r)
    @rufunc = if options.ru then @makeRadiusFunction(options.ru) else @rfunc
    @rvfunc = if options.rv then @makeRadiusFunction(options.rv) else if options.ru then @rufunc else @rfunc
    @points = @samplePoints(path, options.numSteps)
    @tangents = @sampleTangents(path, options.numSteps)
    @frames = @makeFrames(@points, @tangents, options.closed)

    @buildGeometry(@options.caps)

  #TODO
  #- torus know are not ending properly
  #- non closed geometry is missing edge in last semgent?
  buildGeometry: (caps) ->
    caps = if (typeof(caps) != 'undefined') then caps else false
    if @options.loop then caps = false

    index = 0
    numSteps = @options.numSteps
    numSegments = @options.numSegments

    for frame, i in @frames
      for j in [0...numSegments]
        p = @shapePath.points[j % numSegments] #RLY?
        p = p.dup()
        p.x *= @rufunc(i, numSteps)
        p.y *= @rvfunc(i, numSteps)
        p = p.transformMat4(frame.m).add(frame.position)

        @vertices.push(p);
        @texCoords.push(new Vec2(j/numSegments, i/numSteps));
        @normals.push(p.dup().sub(frame.position).normalize());

    if caps
      @vertices.push(@frames[0].position)
      @texCoords.push(new Vec2(0, 0));
      @normals.push(@frames[0].tangent.dup().scale(-1));
      @vertices.push(@frames[@frames.length-1].position)
      @texCoords.push(new Vec2(0, 0));
      @normals.push(@frames[@frames.length-1].tangent.dup().scale(-1));

    index = 0
    for i in [0...@frames.length]
      for j in [0...numSegments]
        if i < numSteps-1
          @faces.push([index + j, index + (j + 1)%numSegments, index + j + numSegments]);
          @faces.push([index + j + numSegments, index + (j + 1)%numSegments, index + (j + 1)%numSegments + numSegments]);
          @edges.push([index + j, index + (j + 1) % numSegments]);
          @edges.push([index + (j + 1) % numSegments, index + j + numSegments]);
          @edges.push([index + j, index + j + numSegments]);
        else if @options.loop
          i
        else
          @edges.push([index + j, index + (j + 1) % numSegments]);
      index += numSegments

    if caps
      for j in [0...numSegments]
        @faces.push([j, (j + 1) % numSegments, @vertices.length-2]);
        @faces.push([index - numSegments + j, index - numSegments + (j + 1) % numSegments, @vertices.length-1]);
        @edges.push([j, @vertices.length-2]);
        @edges.push([index - numSegments + j, @vertices.length-1]);

    return

  makeShapePath: (numSegments) ->
    shapePath = new Path()
    for i in [0...numSegments]
      t = i/numSegments
      a = t * 2 * Math.PI
      p = new Vec3(Math.cos(a), Math.sin(a), 0);
      shapePath.addPoint(p)
    shapePath.close()
    shapePath

  makeFrames: (points, tangents, closed, rot=0) ->
    tangent = tangents[0]

    atx = Math.abs(tangent.x);
    aty = Math.abs(tangent.y);
    atz = Math.abs(tangent.z);
    v = null
    if atz > atx && atz >= aty
      v = tangent.dup().cross(new Vec3(0, 1, 0))
    else if aty > atx && aty >= atz
      v = tangent.dup().cross(new Vec3(1, 0, 0))
    else
      v = tangent.dup().cross(new Vec3(0, 0, 1))

    normal = @options.initialNormal || Vec3.create().asCross(tangent, v).normalize()
    binormal = Vec3.create().asCross(tangent, normal).normalize()
    prevBinormal = null
    prevNormal = null

    frames = []
    v = new Vec3()
    rotation = new Quat()
    #rotation = new Mat4()
    for i in [0..points.length-1]
      position = points[i]
      tangent = tangents[i]
      if i > 0
        normal = normal.dup()
        binormal = binormal.dup()
        prevTangent = tangents[i-1]
        v.asCross(prevTangent, tangent)
        if v.length() > EPSILON
          v.normalize()
          theta = acos(prevTangent.dot(tangent))
          rotation.setAxisAngle(v, theta * 180/PI)
          normal.transformQuat(rotation)
          #rotation.identity().rotate(theta, v.x, v.y, v.z)
          #normal.transformMat4(rotation)
        binormal.asCross(tangent, normal)

      m = new Mat4().set4x4r(
        binormal.x, normal.x, tangent.x, 0,
        binormal.y, normal.y, tangent.y, 0,
        binormal.z, normal.z, tangent.z, 0,
          0,   0,           0,           1
      );

      frames.push({
        tangent: tangent
        normal: normal
        binormal: binormal
        position: position
        m : m
      })

    if closed
      firstNormal = frames[0].normal
      lastNormal = frames[frames.length-1].normal
      theta = firstNormal.dot(lastNormal)
      theta /= (frames.length - 1)
      #TODO why?
      if tangents[0].dot(v.asCross(firstNormal, lastNormal)) > 0
        theta = -theta

      for frame, frameIndex in frames
        rotation.setAxisAngle(frame.tangent, theta * frameIndex * 180/PI)
        frame.normal.transformQuat(rotation)
        #rotation.identity().rotate(theta * frameIndex, frame.tangent.x, frame.tangent.y, frame.tangent.z)
        #normal.transformMat4(rotation)
        frame.binormal.asCross(frame.tangent, frame.normal)
        frame.m.set4x4r(
          frame.binormal.x, frame.normal.x, frame.tangent.x, 0,
          frame.binormal.y, frame.normal.y, frame.tangent.y, 0,
          frame.binormal.z, frame.normal.z, frame.tangent.z, 0,
          0,   0,           0,           1
        )

    frames

  samplePoints: (path, numSteps) ->
    points = [0..numSteps-1].map (i) -> path.getPointAt(i/numSteps)

  sampleTangents: (path, numSteps) ->
    tangents = [0..numSteps-1].map (i) ->path.getTangentAt(i/numSteps)

  makeRadiusFunction: (r) ->
    if r instanceof Spline1D
      rfunc = (t, n) ->
        return r.getPointAt(t/(n-1))
    else
      rfunc = (t) -> r

  ###
  toDebugLines: (lineLength=0.5) ->
    lineBuilder = new LineBuilder()
    for frame, frameIndex in @frames
      g = new Color(0, frameIndex/@frames.length, 0, 1)
      lineBuilder.addLine(frame.position, frame.position.dup().add(frame.tangent.dup().scale(lineLength)), Color.Red, Color.Red)
      lineBuilder.addLine(frame.position, frame.position.dup().add(frame.normal.dup().scale(lineLength)), g, g)
      lineBuilder.addLine(frame.position, frame.position.dup().add(frame.binormal.dup().scale(lineLength)), Color.Blue, Color.Blue)
    lineBuilder

  toDebugPoints: (lineLength=0.5) ->
    lineBuilder = new LineBuilder()
    for frame, frameIndex in @frames
      lineBuilder.addLine(frame.position, frame.position.dup().add(new Vec3(1,0,0).scale(lineLength/5)), Color.Red, Color.Red)
      lineBuilder.addLine(frame.position, frame.position.dup().add(new Vec3(0,1,0).scale(lineLength/5)), Color.Green, Color.Green)
      lineBuilder.addLine(frame.position, frame.position.dup().add(new Vec3(0,0,1).scale(lineLength/5)), Color.Blue, Color.Blue)
    lineBuilder
  ###

module.exports = Loft


