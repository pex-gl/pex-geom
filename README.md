# pex-geom

[![npm version](https://img.shields.io/npm/v/pex-geom)](https://www.npmjs.com/package/pex-geom)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/pex-geom)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/pex-geom)](https://bundlephobia.com/package/pex-geom)
[![dependencies](https://img.shields.io/librariesio/release/npm/pex-geom)](https://github.com/pex-gl/pex-geom/blob/main/package.json)
[![types](https://img.shields.io/npm/types/pex-geom)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/pex-gl/pex-geom)](https://github.com/pex-gl/pex-geom/blob/main/LICENSE.md)

Geometry intersection and bounding volume helpers for [PEX](https://pex.gl).

## Installation

```bash
npm install pex-geom
```

## Usage

```js
import { ray, aabb } from "pex-geom";

const box = aabb.fromPoints([
  [-1, -1, -1],
  [1, 1, 1],
]);

const intersect = ray.hitTestAABB(
  [
    [0, 0, 0],
    [0, 1, 0],
  ],
  box
);
console.log(intersect);
// => true
```

## API

<!-- api-start -->

## Modules

<dl>
<dt><a href="#module_aabb">aabb</a></dt>
<dd></dd>
<dt><a href="#module_index">index</a></dt>
<dd><p>Re-export aabb, plane, ray and rect</p>
</dd>
<dt><a href="#module_plane">plane</a></dt>
<dd></dd>
<dt><a href="#module_ray">ray</a></dt>
<dd></dd>
<dt><a href="#module_rect">rect</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#aabb">aabb</a> : <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>An axis-aligned bounding box defined by two min and max 3D points.</p>
</dd>
<dt><a href="#plane">plane</a> : <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>A plane defined by a 3D point and a normal vector perpendicular to the plane’s surface.</p>
</dd>
<dt><a href="#ray">ray</a> : <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>A ray defined by a starting 3D point origin and a 3D direction vector.</p>
</dd>
<dt><a href="#rect">rect</a> : <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>A rectangle defined by two diagonally opposite 2D points.</p>
</dd>
<dt><a href="#triangle">triangle</a> : <code>Array.&lt;Array.&lt;number&gt;&gt;</code></dt>
<dd><p>A triangle defined by three 3D points.</p>
</dd>
</dl>

<a name="module_aabb"></a>

## aabb

- [aabb](#module_aabb)
  - [.create()](#module_aabb.create) ⇒ [<code>aabb</code>](#aabb)
  - [.empty(a)](#module_aabb.empty) ⇒ [<code>rect</code>](#rect)
  - [.copy(a)](#module_aabb.copy) ⇒ [<code>aabb</code>](#aabb)
  - [.set(a, b)](#module_aabb.set) ⇒ [<code>aabb</code>](#aabb)
  - [.isEmpty(a)](#module_aabb.isEmpty) ⇒ <code>boolean</code>
  - [.fromPoints(a, points)](#module_aabb.fromPoints) ⇒ [<code>aabb</code>](#aabb)
  - [.getCorners(a, [points])](#module_aabb.getCorners) ⇒ <code>Array.&lt;module:pex-math/types/types~vec3&gt;</code>
  - [.center(a, out)](#module_aabb.center) ⇒ <code>module:pex-math/types/types~vec3</code>
  - [.size(a, out)](#module_aabb.size) ⇒ <code>module:pex-math/types/types~vec3</code>
  - [.containsPoint(a, p)](#module_aabb.containsPoint) ⇒ <code>boolean</code>
  - [.includeAABB(a, b)](#module_aabb.includeAABB) ⇒ [<code>aabb</code>](#aabb)
  - [.includePoint(a, p, [i])](#module_aabb.includePoint) ⇒ <code>module:pex-math/types/types~vec3</code>
  - [.toString(a, [precision])](#module_aabb.toString) ⇒ <code>string</code>

<a name="module_aabb.create"></a>

### aabb.create() ⇒ [<code>aabb</code>](#aabb)

Creates a new bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)
<a name="module_aabb.empty"></a>

### aabb.empty(a) ⇒ [<code>rect</code>](#rect)

Reset a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>aabb</code>](#aabb) |

<a name="module_aabb.copy"></a>

### aabb.copy(a) ⇒ [<code>aabb</code>](#aabb)

Copies a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>aabb</code>](#aabb) |

<a name="module_aabb.set"></a>

### aabb.set(a, b) ⇒ [<code>aabb</code>](#aabb)

Sets a bounding box to another.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>aabb</code>](#aabb) |
| b     | [<code>aabb</code>](#aabb) |

<a name="module_aabb.isEmpty"></a>

### aabb.isEmpty(a) ⇒ <code>boolean</code>

Checks if a bounding box is empty.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>aabb</code>](#aabb) |

<a name="module_aabb.fromPoints"></a>

### aabb.fromPoints(a, points) ⇒ [<code>aabb</code>](#aabb)

Updates a bounding box from a list of points.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param  | Type                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| a      | [<code>aabb</code>](#aabb)                                                                                         |
| points | <code>Array.&lt;module:pex-math/types/types~vec3&gt;</code> \| <code>module:pex-math/types/types~TypedArray</code> |

<a name="module_aabb.getCorners"></a>

### aabb.getCorners(a, [points]) ⇒ <code>Array.&lt;module:pex-math/types/types~vec3&gt;</code>

Returns a list of 8 points from a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param    | Type                                                        |
| -------- | ----------------------------------------------------------- |
| a        | [<code>aabb</code>](#aabb)                                  |
| [points] | <code>Array.&lt;module:pex-math/types/types~vec3&gt;</code> |

<a name="module_aabb.center"></a>

### aabb.center(a, out) ⇒ <code>module:pex-math/types/types~vec3</code>

Returns the center of a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>aabb</code>](#aabb)                    |
| out   | <code>module:pex-math/types/types~vec3</code> |

<a name="module_aabb.size"></a>

### aabb.size(a, out) ⇒ <code>module:pex-math/types/types~vec3</code>

Returns the size of a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>aabb</code>](#aabb)                    |
| out   | <code>module:pex-math/types/types~vec3</code> |

<a name="module_aabb.containsPoint"></a>

### aabb.containsPoint(a, p) ⇒ <code>boolean</code>

Checks if a point is inside a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>aabb</code>](#aabb)                    |
| p     | <code>module:pex-math/types/types~vec3</code> |

<a name="module_aabb.includeAABB"></a>

### aabb.includeAABB(a, b) ⇒ [<code>aabb</code>](#aabb)

Includes a bounding box in another.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>aabb</code>](#aabb) |
| b     | [<code>aabb</code>](#aabb) |

<a name="module_aabb.includePoint"></a>

### aabb.includePoint(a, p, [i]) ⇒ <code>module:pex-math/types/types~vec3</code>

Includes a point in a bounding box.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param | Type                                          | Default        | Description               |
| ----- | --------------------------------------------- | -------------- | ------------------------- |
| a     | [<code>aabb</code>](#aabb)                    |                |                           |
| p     | <code>module:pex-math/types/types~vec3</code> |                |                           |
| [i]   | <code>number</code>                           | <code>0</code> | offset in the point array |

<a name="module_aabb.toString"></a>

### aabb.toString(a, [precision]) ⇒ <code>string</code>

Prints a bounding box to a string.

**Kind**: static method of [<code>aabb</code>](#module_aabb)

| Param       | Type                       | Default        |
| ----------- | -------------------------- | -------------- |
| a           | [<code>aabb</code>](#aabb) |                |
| [precision] | <code>number</code>        | <code>4</code> |

<a name="module_index"></a>

## index

Re-export aabb, plane, ray and rect

<a name="module_plane"></a>

## plane

- [plane](#module_plane)
  - [.Side](#module_plane.Side) : <code>enum</code>
  - [.create()](#module_plane.create) ⇒ [<code>plane</code>](#plane)
  - [.side(plane, point)](#module_plane.side) ⇒ <code>number</code>
  - [.toString(a, [precision])](#module_plane.toString) ⇒ <code>string</code>

<a name="module_plane.Side"></a>

### plane.Side : <code>enum</code>

Enum for different side values

**Kind**: static enum of [<code>plane</code>](#module_plane)
**Read only**: true
<a name="module_plane.create"></a>

### plane.create() ⇒ [<code>plane</code>](#plane)

Creates a new plane

**Kind**: static method of [<code>plane</code>](#module_plane)
<a name="module_plane.side"></a>

### plane.side(plane, point) ⇒ <code>number</code>

Returns on which side a point is.

**Kind**: static method of [<code>plane</code>](#module_plane)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| plane | [<code>plane</code>](#plane)                  |
| point | <code>module:pex-math/types/types~vec3</code> |

<a name="module_plane.toString"></a>

### plane.toString(a, [precision]) ⇒ <code>string</code>

Prints a plane to a string.

**Kind**: static method of [<code>plane</code>](#module_plane)

| Param       | Type                         | Default        |
| ----------- | ---------------------------- | -------------- |
| a           | [<code>plane</code>](#plane) |                |
| [precision] | <code>number</code>          | <code>4</code> |

<a name="module_ray"></a>

## ray

- [ray](#module_ray)
  - [.Intersections](#module_ray.Intersections) : <code>enum</code>
  - [.create()](#module_ray.create) ⇒ [<code>ray</code>](#ray)
  - [.hitTestPlane(ray, plane, out)](#module_ray.hitTestPlane) ⇒ <code>number</code>
  - [.hitTestTriangle(ray, triangle, out)](#module_ray.hitTestTriangle) ⇒ <code>number</code>
  - [.hitTestAABB(ray, aabb)](#module_ray.hitTestAABB) ⇒ <code>boolean</code>
  - [.intersectsAABB()](#module_ray.intersectsAABB)
  - [.toString(a, [precision])](#module_ray.toString) ⇒ <code>string</code>

<a name="module_ray.Intersections"></a>

### ray.Intersections : <code>enum</code>

Enum for different intersections values

**Kind**: static enum of [<code>ray</code>](#module_ray)
**Read only**: true
<a name="module_ray.create"></a>

### ray.create() ⇒ [<code>ray</code>](#ray)

Creates a new ray

**Kind**: static method of [<code>ray</code>](#module_ray)
<a name="module_ray.hitTestPlane"></a>

### ray.hitTestPlane(ray, plane, out) ⇒ <code>number</code>

Determines if a ray intersect a plane and set intersection point

**Kind**: static method of [<code>ray</code>](#module_ray)
**See**: [https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/raycast/sld017.htm](https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/raycast/sld017.htm)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| ray   | [<code>ray</code>](#ray)                      |
| plane | [<code>plane</code>](#plane)                  |
| out   | <code>module:pex-math/types/types~vec3</code> |

<a name="module_ray.hitTestTriangle"></a>

### ray.hitTestTriangle(ray, triangle, out) ⇒ <code>number</code>

Determines if a ray intersect a triangle and set intersection point

**Kind**: static method of [<code>ray</code>](#module_ray)
**See**: [http://geomalgorithms.com/a06-\_intersect-2.html#intersect3D_RayTriangle()](<http://geomalgorithms.com/a06-_intersect-2.html#intersect3D_RayTriangle()>)

| Param    | Type                                          |
| -------- | --------------------------------------------- |
| ray      | [<code>ray</code>](#ray)                      |
| triangle | [<code>triangle</code>](#triangle)            |
| out      | <code>module:pex-math/types/types~vec3</code> |

<a name="module_ray.hitTestAABB"></a>

### ray.hitTestAABB(ray, aabb) ⇒ <code>boolean</code>

Determines if a ray intersect an AABB bounding box

**Kind**: static method of [<code>ray</code>](#module_ray)
**See**: [http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms](http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms)

| Param | Type                       |
| ----- | -------------------------- |
| ray   | [<code>ray</code>](#ray)   |
| aabb  | [<code>aabb</code>](#aabb) |

<a name="module_ray.intersectsAABB"></a>

### ray.intersectsAABB()

Alias for [hitTestAABB](hitTestAABB)

**Kind**: static method of [<code>ray</code>](#module_ray)
<a name="module_ray.toString"></a>

### ray.toString(a, [precision]) ⇒ <code>string</code>

Prints a plane to a string.

**Kind**: static method of [<code>ray</code>](#module_ray)

| Param       | Type                     | Default        |
| ----------- | ------------------------ | -------------- |
| a           | [<code>ray</code>](#ray) |                |
| [precision] | <code>number</code>      | <code>4</code> |

<a name="module_rect"></a>

## rect

- [rect](#module_rect)
  - [.create()](#module_rect.create) ⇒ [<code>rect</code>](#rect)
  - [.empty(a)](#module_rect.empty) ⇒ [<code>rect</code>](#rect)
  - [.copy(a)](#module_rect.copy) ⇒ [<code>rect</code>](#rect)
  - [.set(a, b)](#module_rect.set) ⇒ [<code>rect</code>](#rect)
  - [.isEmpty(a)](#module_rect.isEmpty) ⇒ <code>boolean</code>
  - [.fromPoints(a, points)](#module_rect.fromPoints) ⇒ [<code>rect</code>](#rect)
  - [.getCorners(a, points)](#module_rect.getCorners) ⇒ <code>Array.&lt;module:pex-math/types/types~vec2&gt;</code>
  - [.scale(a, n)](#module_rect.scale) ⇒ [<code>rect</code>](#rect)
  - [.setSize(a, size)](#module_rect.setSize) ⇒ [<code>rect</code>](#rect)
  - [.size(a, out)](#module_rect.size) ⇒ <code>module:pex-math/types/types~vec2</code>
  - [.width(a)](#module_rect.width) ⇒ <code>number</code>
  - [.height(a)](#module_rect.height) ⇒ <code>number</code>
  - [.aspectRatio(a)](#module_rect.aspectRatio) ⇒ <code>number</code>
  - [.setPosition(a, p)](#module_rect.setPosition) ⇒ [<code>rect</code>](#rect)
  - [.center(a, out)](#module_rect.center) ⇒ [<code>rect</code>](#rect)
  - [.containsPoint(a, p)](#module_rect.containsPoint) ⇒ <code>boolean</code>
  - [.containsRect(a, b)](#module_rect.containsRect) ⇒ <code>boolean</code>
  - [.includePoint(a, p)](#module_rect.includePoint) ⇒ [<code>rect</code>](#rect)
  - [.includeRect(a, b)](#module_rect.includeRect) ⇒ [<code>rect</code>](#rect)
  - [.mapPoint(a, p)](#module_rect.mapPoint) ⇒ <code>module:pex-math/types/types~vec2</code>
  - [.clampPoint(a, p)](#module_rect.clampPoint) ⇒ <code>module:pex-math/types/types~vec2</code>
  - [.toString(a, [precision])](#module_rect.toString) ⇒ <code>string</code>

<a name="module_rect.create"></a>

### rect.create() ⇒ [<code>rect</code>](#rect)

Creates a new rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)
<a name="module_rect.empty"></a>

### rect.empty(a) ⇒ [<code>rect</code>](#rect)

Reset a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.copy"></a>

### rect.copy(a) ⇒ [<code>rect</code>](#rect)

Copies a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.set"></a>

### rect.set(a, b) ⇒ [<code>rect</code>](#rect)

Sets a rectangle to another.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |
| b     | [<code>rect</code>](#rect) |

<a name="module_rect.isEmpty"></a>

### rect.isEmpty(a) ⇒ <code>boolean</code>

Checks if a rectangle is empty.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.fromPoints"></a>

### rect.fromPoints(a, points) ⇒ [<code>rect</code>](#rect)

Updates a rectangle from a list of points.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param  | Type                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| a      | [<code>rect</code>](#rect)                                                                                         |
| points | <code>Array.&lt;module:pex-math/types/types~vec2&gt;</code> \| <code>module:pex-math/types/types~TypedArray</code> |

<a name="module_rect.getCorners"></a>

### rect.getCorners(a, points) ⇒ <code>Array.&lt;module:pex-math/types/types~vec2&gt;</code>

Returns a list of 4 points from a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param  | Type                                                        |
| ------ | ----------------------------------------------------------- |
| a      | [<code>rect</code>](#rect)                                  |
| points | <code>Array.&lt;module:pex-math/types/types~vec2&gt;</code> |

<a name="module_rect.scale"></a>

### rect.scale(a, n) ⇒ [<code>rect</code>](#rect)

Scales a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |
| n     | <code>number</code>        |

<a name="module_rect.setSize"></a>

### rect.setSize(a, size) ⇒ [<code>rect</code>](#rect)

Sets the size of a rectangle using width and height.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| size  | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.size"></a>

### rect.size(a, out) ⇒ <code>module:pex-math/types/types~vec2</code>

Returns the size of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| out   | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.width"></a>

### rect.width(a) ⇒ <code>number</code>

Returns the width of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.height"></a>

### rect.height(a) ⇒ <code>number</code>

Returns the height of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.aspectRatio"></a>

### rect.aspectRatio(a) ⇒ <code>number</code>

Returns the aspect ratio of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |

<a name="module_rect.setPosition"></a>

### rect.setPosition(a, p) ⇒ [<code>rect</code>](#rect)

Sets the position of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| p     | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.center"></a>

### rect.center(a, out) ⇒ [<code>rect</code>](#rect)

Returns the center of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| out   | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.containsPoint"></a>

### rect.containsPoint(a, p) ⇒ <code>boolean</code>

Checks if a point is inside a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| p     | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.containsRect"></a>

### rect.containsRect(a, b) ⇒ <code>boolean</code>

Checks if a rectangle is inside another rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |
| b     | [<code>rect</code>](#rect) |

<a name="module_rect.includePoint"></a>

### rect.includePoint(a, p) ⇒ [<code>rect</code>](#rect)

Includes a point in a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| p     | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.includeRect"></a>

### rect.includeRect(a, b) ⇒ [<code>rect</code>](#rect)

Includes a rectangle in another rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                       |
| ----- | -------------------------- |
| a     | [<code>rect</code>](#rect) |
| b     | [<code>rect</code>](#rect) |

<a name="module_rect.mapPoint"></a>

### rect.mapPoint(a, p) ⇒ <code>module:pex-math/types/types~vec2</code>

Maps a point into the dimensions of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| p     | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.clampPoint"></a>

### rect.clampPoint(a, p) ⇒ <code>module:pex-math/types/types~vec2</code>

Clamps a point into the dimensions of a rectangle.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param | Type                                          |
| ----- | --------------------------------------------- |
| a     | [<code>rect</code>](#rect)                    |
| p     | <code>module:pex-math/types/types~vec2</code> |

<a name="module_rect.toString"></a>

### rect.toString(a, [precision]) ⇒ <code>string</code>

Prints a rect to a string.

**Kind**: static method of [<code>rect</code>](#module_rect)

| Param       | Type                       | Default        |
| ----------- | -------------------------- | -------------- |
| a           | [<code>rect</code>](#rect) |                |
| [precision] | <code>number</code>        | <code>4</code> |

<a name="aabb"></a>

## aabb : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

An axis-aligned bounding box defined by two min and max 3D points.

**Kind**: global typedef
<a name="plane"></a>

## plane : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

A plane defined by a 3D point and a normal vector perpendicular to the plane’s surface.

**Kind**: global typedef
<a name="ray"></a>

## ray : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

A ray defined by a starting 3D point origin and a 3D direction vector.

**Kind**: global typedef
<a name="rect"></a>

## rect : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

A rectangle defined by two diagonally opposite 2D points.

**Kind**: global typedef
<a name="triangle"></a>

## triangle : <code>Array.&lt;Array.&lt;number&gt;&gt;</code>

A triangle defined by three 3D points.

**Kind**: global typedef

<!-- api-end -->

## License

MIT. See [license file](https://github.com/pex-gl/pex-geom/blob/main/LICENSE.md).
