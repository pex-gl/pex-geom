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

### `aabb.copy(a)`
Copies a bounding box.

- `a`: aabb

Returns a new instance of `a`.

### `aabb.fromPoints(a)`
Creates a bounding box a list of points.

- `a`: [vec3]

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

### `aabb.includePoint(a, p)`
Includes a point in a bounding box.

- `a`: aabb
- `p`: vec3

Returns `a`.
