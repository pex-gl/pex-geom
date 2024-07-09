/** @module plane */

import { vec3 } from "pex-math";

/**
 * Enum for different side values
 * @readonly
 * @enum {number}
 */
export const Side = Object.freeze({
  OnPlane: 0,
  Same: -1,
  Opposite: 1,
});

const TEMP_0 = vec3.create();

/**
 * Creates a new plane
 * @returns {import("./types.js").plane}
 */
export function create() {
  return [
    [0, 0, 0],
    [0, 1, 0],
  ];
}

/**
 * Returns on which side a point is.
 * @param {import("./types.js").plane} plane
 * @param {import("./types.js").vec3} point
 * @returns {number}
 */
export function side([planePoint, planeNormal], point) {
  vec3.set(TEMP_0, planePoint);
  vec3.sub(TEMP_0, point);
  vec3.normalize(TEMP_0);
  const dot = vec3.dot(TEMP_0, planeNormal);
  if (dot > 0) return Side.Opposite;
  if (dot < 0) return Side.Same;
  return Side.OnPlane;
}

/**
 * Prints a plane to a string.
 * @param {import("./types.js").plane} a
 * @param {number} [precision=4]
 * @returns {string}
 */
export function toString(a, precision = 4) {
  // prettier-ignore
  return `[${vec3.toString(a[0], precision)}, ${vec3.toString(a[1], precision)}]`;
}
