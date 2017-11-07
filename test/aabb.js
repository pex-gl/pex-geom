var test = require('tape')
var aabb = require('../aabb')

var allMethods = Object.keys(aabb)
var handledMethods = []

test('aabb.create', function (t) {
  var min = [Infinity, Infinity, Infinity]
  var max = [-Infinity, -Infinity, -Infinity]
  t.deepEqual(aabb.create(), [min, max], 'should create a new abb')
  handledMethods.push('create')
  t.end()
})

test('coverage', function (t) {
  allMethods.forEach(function (name) {
    if (handledMethods.indexOf(name) === -1) {
      console.log('missing test for aabb.' + name)
    }
  })
  t.end()
})

