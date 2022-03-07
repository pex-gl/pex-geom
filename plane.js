/**
 * @module plane
 */

import { vec3 } from "pex-math";

import { hitTestPlane } from "./ray.js";

/**
 * @typedef {number[][]} plane A plane defined by a 3D point and a normal vector perpendicular to the plane’s surface.
 */

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
 * Set the point of intersection betweeen a plane and a ray if it exists to out.
 * @param {plane} plane
 * @param {ray} ray
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */
export function getRayIntersection(plane, ray, out) {
  return hitTestPlane(ray, plane[0], plane[1], out);
}

/**
 * Returns on which side a point is.
 * @param {plane} plane
 * @param {import("pex-math").vec3} point
 * @returns {number}
 */
export function side(plane, point) {
  const planePoint = plane[0];
  const planeNormal = plane[1];
  vec3.set(TEMP_0, planePoint);
  vec3.sub(TEMP_0, point);
  vec3.normalize(TEMP_0);
  const dot = vec3.dot(TEMP_0, planeNormal);
  if (dot > 0) return 1;
  if (dot < 0) return -1;
  return 0;
}
