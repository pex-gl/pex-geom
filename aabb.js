/** @module aabb */

import { set3 } from "../pex-math/avec3.js";

/**
 * @typedef {number[][]} aabb An axis-aligned bounding box defined by two min and max 3D points.
 */

/**
 * Creates a new bounding box.
 * @returns {aabb}
 */
export function create() {
  // [min, max]
  return [
    [Infinity, Infinity, Infinity],
    [-Infinity, -Infinity, -Infinity],
  ];
}

/**
 * Reset a bounding box.
 * @param {aabb} a
 * @returns {rect}
 */
export function empty(a) {
  a[0][0] = Infinity;
  a[0][1] = Infinity;
  a[0][2] = Infinity;
  a[1][0] = -Infinity;
  a[1][1] = -Infinity;
  a[1][2] = -Infinity;
  return a;
}

/**
 * Copies a bounding box.
 * @param {aabb} a
 * @returns {aabb}
 */
export function copy(a) {
  return [a[0].slice(), a[1].slice()];
}

/**
 * Sets a bounding box to another.
 * @param {aabb} a
 * @param {aabb} b
 * @returns {aabb}
 */
export function set(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[0][2] = b[0][2];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  a[1][2] = b[1][2];
  return a;
}

/**
 * Checks if a bounding box is empty.
 * @param {aabb} aabb
 * @returns {boolean}
 */
export function isEmpty(a) {
  return a[0][0] > a[1][0] || a[0][1] > a[1][1] || a[0][2] > a[1][2];
}

/**
 * Updates a bounding box from a list of points.
 * @param {aabb} a
 * @param {import("pex-math").vec3[] | TypedArray} points
 * @returns {aabb}
 */
export function fromPoints(a, points) {
  const isTypedArray = !Array.isArray(points);
  for (let i = 0; i < points.length / (isTypedArray ? 3 : 1); i++) {
    includePoint(a, isTypedArray ? points.slice(i * 3) : points[i]);
  }

  return a;
}

/**
 * Returns a list of 8 points from a bounding box.
 * @param {aabb} aabb
 * @param {import("pex-math").vec3[]} [points]
 * @returns {import("pex-math").vec3[]}
 */
export function getCorners(a, points = Array.from({ length: 8 }, () => [])) {
  set3(points[0], 0, a[0][0], a[0][1], a[0][2]);
  set3(points[1], 0, a[1][0], a[0][1], a[0][2]);
  set3(points[2], 0, a[1][0], a[0][1], a[1][2]);
  set3(points[3], 0, a[0][0], a[0][1], a[1][2]);
  set3(points[4], 0, a[0][0], a[1][1], a[0][2]);
  set3(points[5], 0, a[1][0], a[1][1], a[0][2]);
  set3(points[6], 0, a[1][0], a[1][1], a[1][2]);
  set3(points[7], 0, a[0][0], a[1][1], a[1][2]);
  return points;
}

/**
 * Returns the center of a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} out
 * @returns {import("pex-math").vec3}
 */
export function center(a, out = [0, 0, 0]) {
  out[0] = (a[0][0] + a[1][0]) / 2;
  out[1] = (a[0][1] + a[1][1]) / 2;
  out[2] = (a[0][2] + a[1][2]) / 2;
  return out;
}

/**
 * Returns the size of a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} out
 * @returns {import("pex-math").vec3}
 */
export function size(a, out = [0, 0, 0]) {
  out[0] = Math.abs(a[1][0] - a[0][0]);
  out[1] = Math.abs(a[1][1] - a[0][1]);
  out[2] = Math.abs(a[1][2] - a[0][2]);
  return out;
}

/**
 * Checks if a point is inside a bounding box.
 * @param {bbox} a
 * @param {import("pex-math").vec3} p
 * @returns {boolean}
 */
export function containsPoint(a, [x, y, z]) {
  return (
    x >= a[0][0] &&
    x <= a[1][0] &&
    y >= a[0][1] &&
    y <= a[1][1] &&
    z >= a[0][2] &&
    z <= a[1][2]
  );
}

/**
 * Includes a bounding box in another.
 * @param {aabb} a
 * @param {aabb} b
 * @returns {aabb}
 */
export function includeAABB(a, b) {
  if (isEmpty(a)) {
    set(a, b);
  } else if (isEmpty(b)) {
    // do nothing
  } else {
    a[0][0] = Math.min(a[0][0], b[0][0]);
    a[0][1] = Math.min(a[0][1], b[0][1]);
    a[0][2] = Math.min(a[0][2], b[0][2]);
    a[1][0] = Math.max(a[1][0], b[1][0]);
    a[1][1] = Math.max(a[1][1], b[1][1]);
    a[1][2] = Math.max(a[1][2], b[1][2]);
  }

  return a;
}

/**
 * Includes a point in a bounding box.
 * @param {aabb} a
 * @param {import("pex-math").vec3} p
 * @returns {import("pex-math").vec3}
 */
export function includePoint(a, p) {
  a[0][0] = Math.min(a[0][0], p[0]);
  a[0][1] = Math.min(a[0][1], p[1]);
  a[0][2] = Math.min(a[0][2], p[2]);
  a[1][0] = Math.max(a[1][0], p[0]);
  a[1][1] = Math.max(a[1][1], p[1]);
  a[1][2] = Math.max(a[1][2], p[2]);
  return a;
}
