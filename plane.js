/**
 * @module plane
 */

import { vec3 } from "pex-math";

import { hitTestPlane } from "./ray.js";

/**
 * @typedef {number[][]} plane A plane defined by a 3D point and a normal vector perpendicular to the plane’s surface.
 */

/**
 * Enum for different side values
 * @readonly
 * @enum {number}
 */
export const SIDE = Object.freeze({
  ON_PLANE: 0,
  SAME: -1,
  OPPOSITE: 1,
});

const TEMP_0 = vec3.create();

/**
 * Creates a new plane
 * @returns {plane}
 */
export function create() {
  return [
    [0, 0, 0],
    [0, 1, 0],
  ];
}

/**
 * Returns on which side a point is.
 * @param {plane} plane
 * @param {import("pex-math").vec3} point
 * @returns {number}
 */
export function side([planePoint, planeNormal], point) {
  vec3.set(TEMP_0, planePoint);
  vec3.sub(TEMP_0, point);
  vec3.normalize(TEMP_0);
  const dot = vec3.dot(TEMP_0, planeNormal);
  if (dot > 0) return SIDE.OPPOSITE;
  if (dot < 0) return SIDE.SAME;
  return SIDE.ON_PLANE;
}
