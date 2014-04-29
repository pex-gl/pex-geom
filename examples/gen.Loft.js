var sys = require('pex-sys');
var glu = require('pex-glu');
var geom = require('pex-geom');
var materials = require('pex-materials');
var color = require('pex-color');

var Vec3 = require('../lib/Vec3');
var Loft = require('../lib/gen/Loft');
var Spline3D = require('../lib/Spline3D');
var Mesh = glu.Mesh;
var ShowNormals = materials.ShowNormals;
var PerspectiveCamera = glu.PerspectiveCamera;
var Arcball = glu.Arcball;
var Color = color.Color;

sys.Window.create({
  settings: {
    width: 1280,
    height: 720,
    type: '3d'
  },
  init: function() {
    var spline = new Spline3D([
      new Vec3(-2, -1, -1),
      new Vec3(-1,  1, 0),
      new Vec3( 1,  1, 0),
      new Vec3( 2, -1, 1)
    ], false);
    var loft = new Loft(spline, { caps: true, numSteps: 200 });
    this.mesh = new Mesh(loft, new ShowNormals());

    this.camera = new PerspectiveCamera(60, this.width / this.height);
    this.arcball = new Arcball(this, this.camera);
  },
  draw: function() {
    glu.clearColorAndDepth(Color.Red);
    glu.enableDepthReadAndWrite(true);
    this.mesh.draw(this.camera);
  }
});