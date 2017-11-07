var test = require('tape')
var ray = require('../ray')

var allMethods = Object.keys(ray)
var handledMethods = []

test('ray.create', function (t) {
  t.deepEqual(ray.create(), [[0, 0, 0], [0, 0, 1]], 'should create a new ray')
  handledMethods.push('create')
  t.end()
})

test('coverage', function (t) {
  allMethods.forEach(function (name) {
    if (handledMethods.indexOf(name) === -1) {
      console.log('missing test for ray.' + name)
    }
  })
  t.end()
})

