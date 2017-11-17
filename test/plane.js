var test = require('tape')
var plane = require('../plane')

var allMethods = Object.keys(plane)
var handledMethods = []

test('plane.create', function (t) {
  t.deepEqual(plane.create(), [[0, 0, 0], [0, 1, 0]], 'should create a new plane')
  handledMethods.push('create')
  t.end()
})

test('coverage', function (t) {
  allMethods.forEach(function (name) {
    if (handledMethods.indexOf(name) === -1) {
      console.log('missing test for plane.' + name)
    }
  })
  t.end()
})

