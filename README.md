# pex-geom

Geometry related code for the pex library

## aabb

`var aabb = require('pex-geom/aabb')`

### `aabb.create()`
Creates a new axis-aligned bounding box.
```
aabb.create()
// => [[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]]
```
Returns a new `aabb`.

### `aabb.set(a, b)`
Sets a bounding box to another.

- `a`: aabb
- `b`: aabb

Returns `a`.

### `aabb.copy(a)`
Copies a bounding box.

- `a`: aabb

Returns a new instance of `a`.

### `aabb.fromPoints(aa)`
Creates a bounding box a list of points.

- `aa`: [vec3]

Returns a new `aabb`.

### `aabb.center(a, out)`
Returns the center of a bounding box.

- `a`: aabb
- `out`: vec3

Returns `out` or a new `vec3` if `out` isn't passed.

### `aabb.size(a, out)`
Returns the size of a bounding box.

- `a`: aabb
- `out`: vec3

Returns `out` or a new `vec3` if `out` isn't passed.

### `aabb.isEmpty(a)`
Checks if a bounding box is empty.

- `a`: aabb

Returns a `bool`.

### `aabb.includeAABB(a, b)`
Includes a bounding box in another.

- `a`: aabb
- `b`: aabb

Returns `a`.

### `aabb.includePoint(a, v)`
Includes a point in a bounding box.

- `a`: aabb
- `v`: vec3

Returns `a`.

## rect

`var rect = require('pex-geom/rect')`

### `rect.create()`
Returns a new rectangle.

```
var r = rect.create()
// => [[Infinity, Infinity], [-Infinity, -Infinity]]
```
Returns a new `rect`.

### `rect.zero()`
Returns a new rectangle with all zeros.

```
var r = rect.zero()
// => [[0, 0], [0, 0]]
```
Returns a new `rect`.

### `rect.copy(r)`
Copies a rect.

- `r`: rect

Returns a new instance of `r`.

### `rect.set(r, c)`
Sets a rect to another.

- `r`: rect
- `c`: rect

Returns `r` set to `c`.

### `rect.scale(r, s)`
Scales a rect.

- `r`: rect
- `s`: Number

Returns `r` scaled.

### `rect.setSize(r, wh)`
Sets the size of a rect using width and height.

- `r`: rect
- `wh`: vec2 - [width, height]

Returns `r` with new size.

### `rect.getSize(r, out)`
Returns the size of a rect.

- `r`: rect
- `out`: vec2 - [width, height]

Returns `out` or a new `vec2` if `out` isn't passed.

### `rect.getAspectRatio(r)`
Returns the aspect ratio of a rect.

- `r`: rect

Returns a `Number`.

### `rect.setPosition(r, v)`
Sets the position of a rect.

- `r`: rect
- `v`: vec2

Returns `a`.

### `rect.getCenter(r, out)`
Returns the center of a rect.

- `r`: rect
- `out`: vec2 - center of the rect

Returns `out` or a new `vec` if out isn't passed.

### `rect.containsPoint(r, v)`
Checks whether a point is inside a rect.

- `r`: rect
- `v`: vec2

Returns a `bool`.

### `rect.containsRect(r, c)`
Checks whether a point is inside a rect.

- `r`: rect
- `c`: rect

Returns a `bool`.

### `rect.includePoint(r, v)`
Includes point in a rect.

- `r`: rect
- `v`: vec2

Returns `r`.

### `rect.includePoints(r, vv)`
Includes an array of points in a rect.

- `r`: rect
- `vv`: [vec2]

Returns `r`.

### `rect.includePoints(r, vv)`
Includes an array of points in a rect.

- `r`: rect
- `vv`: [vec2]

Returns `r`.

### `rect.includeRect(r, c)`
Includes a rect in a rect.

- `r`: rect
- `c`: rect

Returns `r`.

### `rect.includeRects(r, cc)`
Includes an array of rects in a rect.

- `r`: rect
- `cc`: [rect]

Returns `r`.

### `rect.mapPoint(r, v)`
Maps a point into the dimensions of a rect.

- `r`: rect
- `v`: vec2

Returns `p`.

### `rect.clampPoint(r, v)`
Clamps a point into the dimensions of a rect.

- `r`: rect
- `v`: vec2

Returns `p`.

### `rect.setEmpty(r)`
Sets a rect to be empty (same as create).

- `r`: rect

Returns `r`.

### `rect.isEmpty(r)`
Checks whether a rect is empty.

- `r`: rect

Returns a `bool`.

### `rect.createFromPoints(vv)`
Creates a rect from an array of points.

- `vv`: [vec2]

Returns a `rect`.

## plane

`var plane = require('pex-geom/plane')`

### `plane.create()`
Creates a new plane.

```
var p = plane.create()
// => [[0, 0, 0], [0, 1, 0]]
```

Returns a new `plane`.

### `plane.getRayIntersection(p, r, out)`
Returns the point of intersection betweeen a plane and a ray if it exists.

- `p`: plane
- `r`: ray
- `out`: vec3

Returns a `vec3` or `Null`.

### `plane.side(p, v)`
Returns on which side a ray a point is.

- `p`: plane
- `v`: vec3

Returns `1`, `0` or `-1`.

## ray

`var aabb = require('pex-geom/aabb')`

### `ray.create()`
Returns a new ray.

```
var `r = ray.create()`
// => [[0, 0, 0], [0, 0, 1]]
```

Returns a `ray`.

### `ray.hitTestTriangle(r, t, out)`
Tests if a ray hits a triangle.

- `r`: ray
- `t`: triangle

Returns a positive `Number` if there is a hit and a negative `Number` if test fails.

### `ray.hitTestPlane(r, v, n, out)`
Tests if a ray hits a plane.

- `r`: ray
- `v`: vec3
- `n`: vec3 - normal
- `out`: vec3

Returns a positive `Number` if there is a hit and a negative `Number` if test fails.

### `ray.intersectAABB(r, a)`
Tests if a ray intersects an axis-aligned bounding box.

- `r`: ray
- `a`: aabb

Returns a `bool`.
