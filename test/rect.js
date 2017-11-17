var test = require('tape')
var rect = require('../rect')

var allMethods = Object.keys(rect)
var handledMethods = []

test('rect.create', function (t) {
  var newRect = [[Infinity, Infinity], [-Infinity, -Infinity]]
  t.deepEqual(rect.create(), newRect, 'should create a new rect')
  handledMethods.push('create')
  t.end()
})

test('coverage', function (t) {
  allMethods.forEach(function (name) {
    if (handledMethods.indexOf(name) === -1) {
      console.log('missing test for rect.' + name)
    }
  })
  t.end()
})

