var sys = require('pex-sys');
var glu = require('pex-glu');
var color = require('pex-color');
var materials = require('pex-materials');
var geom = require('pex-geom');

var Window = sys.Window;
var Cube = require('../lib/gen/Cube');
var IsoSurface = require('../lib/gen/IsoSurface');
var Mesh = glu.Mesh;
var PerspectiveCamera = glu.PerspectiveCamera;
var Arcball = glu.Arcball;
var Color = color.Color;
var Vec3 = require('../lib/Vec3');
var Vec2 = require('../lib/Vec2');
var Texture2D = glu.Texture2D;

var ShowNormals = materials.ShowNormals;
var SolidColor = materials.SolidColor;
var FlatToonShading = materials.FlatToonShading;
var MatCap = materials.MatCap;

var DPI = 2;

Window.create({
  settings: {
    width: 1024 * DPI,
    height: 768 * DPI,
    type: '3d',
    fullscreen: sys.Platform.isBrowser,
    highdpi: DPI
  },
  init: function() {
    this.camera = new PerspectiveCamera(60, this.width / this.height);
    this.arcball = new Arcball(this, this.camera);

    this.meshes = [];

    var spheres = [
      { position: new Vec3(-0.2, 0, 0), radius: 0.4, force: 1.0 },
      { position: new Vec3( 0.3, 0, 0), radius: 0.3, force: 1.0 },
      { position: new Vec3( 0.3, 0.5, 0), radius: 0.3, force: 1.0 },
      { position: new Vec3( 0.0, 0.5, 0.2), radius: 0.3, force: 1.0 }
    ];

    var iso = new IsoSurface(10, 1);
    var isoGeom = iso.update(spheres);
    isoGeom.normals = [];
    isoGeom.texCoords = [];
    console.log(isoGeom.vertices.length)
    //isoGeom.vertices = [];
    //isoGeom.faces = [];
    isoGeom.vertices = isoGeom.vertices.map(function() {
      return new Vec3();
    })
    //console.log(isoGeom.vertices.length);
    //sphere.addAttrib('colors', 'color', colors);

    //sphere = new geom.gen.Sphere();

    var colorBands = Texture2D.load('assets/palette_green.png');
    var mapCap = Texture2D.load('assets/matcap.jpg');

    //this.meshes.push(new Mesh(isoGeom, new SolidColor({ color: Color.Red }), { triangles: true }));
    //this.meshes.push(new Mesh(isoGeom, new ShowNormals(), { triangles: true }));
    //this.meshes.push(new Mesh(sphere, new ShowColors(), { triangles: true }));
    //this.meshes.push(new Mesh(sphere, new Textured({ texture: texture2D, scale: new Vec2(5, 5) }), { triangles: true }));
    //this.meshes.push(new Mesh(sphere, new FlatToonShading({ colorBands: colorBands }), { triangles: true }));
    this.meshes.push(new Mesh(isoGeom, new MatCap({ texture: mapCap }), { triangles: true }));

    var boxGeom = new Cube();
    boxGeom.computeEdges();
    this.box = new Mesh(boxGeom, new SolidColor(), { lines: true });
  },
  draw: function() {
    glu.clearColorAndDepth(Color.Black);
    glu.enableDepthReadAndWrite(true);

    var cols = 3;
    var rows = 3;
    var index = 0;
    var dw = 1/cols * this.width;
    var dh = 1/rows * this.height;
    this.camera.setAspectRatio(dw/dh);
    this.box.draw(this.camera);
    for(var j=0; j<rows; j++) {
      for(var i=0; i<cols; i++) {
        var mesh = this.meshes[index++];
        //glu.viewport(i * dw, this.height - dh - j * dh, dw, dh);
        if (mesh) {
          mesh.draw(this.camera);
        }
      }
    }
  }
});