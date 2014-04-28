var sys = require('pex-sys');
var glu = require('pex-glu');
var geom = require('pex-geom');
var materials = require('pex-materials');
var color = require('pex-color');

var Cube = geom.gen.Cube;
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
    var cube = new Cube();
    this.mesh = new Mesh(cube, new ShowNormals());

    this.camera = new PerspectiveCamera(60, this.width / this.height);
    this.arcball = new Arcball(this, this.camera);
  },
  draw: function() {
    glu.clearColorAndDepth(Color.Red);
    glu.enableDepthReadAndWrite(true);
    this.mesh.draw(this.camera);
  }
});