/** @module ray */

import { vec3 } from "pex-math";

/**
 * Enum for different intersections values
 * @readonly
 * @enum {number}
 */
export const Intersections = Object.freeze({
  Intersect: 1,
  NoIntersect: 0,
  SamePlane: -1,
  Parallel: -2,
  TriangleDegenerate: -2,
});

const TEMP_0 = vec3.create();
const TEMP_1 = vec3.create();
const TEMP_2 = vec3.create();
const TEMP_3 = vec3.create();
const TEMP_4 = vec3.create();
const TEMP_5 = vec3.create();
const TEMP_6 = vec3.create();
const TEMP_7 = vec3.create();

const EPSILON = 1e-6;

/**
 * Creates a new ray
 * @returns {import("./types.js").ray}
 */
export function create() {
  return [
    [0, 0, 0],
    [0, 0, 1],
  ];
}

/**
 * Determines if a ray intersect a plane and set intersection point
 * @see {@link https://www.cs.princeton.edu/courses/archive/fall00/cs426/lectures/raycast/sld017.htm}
 * @param {import("./types.js").ray} ray
 * @param {import("./types.js").plane} plane
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */
export function hitTestPlane(
  [origin, direction],
  [point, normal],
  out = vec3.create()
) {
  vec3.set(TEMP_0, origin);
  vec3.set(TEMP_1, direction);

  const dotDirectionNormal = vec3.dot(TEMP_1, normal);
  if (dotDirectionNormal === 0) return Intersections.SamePlane;

  vec3.set(TEMP_2, point);

  const t = vec3.dot(vec3.sub(TEMP_2, TEMP_0), normal) / dotDirectionNormal;
  if (t < 0) return Intersections.Parallel;

  vec3.set(out, vec3.add(TEMP_0, vec3.scale(TEMP_1, t)));
  return Intersections.Intersect;
}

/**
 * Determines if a ray intersect a triangle and set intersection point
 * @see {@link http://geomalgorithms.com/a06-_intersect-2.html#intersect3D_RayTriangle()}
 * @param {import("./types.js").ray} ray
 * @param {import("./types.js").triangle} triangle
 * @param {import("pex-math").vec3} out
 * @returns {number}
 */
export function hitTestTriangle(
  [origin, direction],
  [p0, p1, p2],
  out = vec3.create()
) {
  // get triangle edge vectors and plane normal
  const u = vec3.sub(vec3.set(TEMP_0, p1), p0);
  const v = vec3.sub(vec3.set(TEMP_1, p2), p0);
  const n = vec3.cross(vec3.set(TEMP_2, u), v);

  if (vec3.length(n) < EPSILON) return Intersections.TriangleDegenerate;

  // ray vectors
  const w0 = vec3.sub(vec3.set(TEMP_3, origin), p0);

  // params to calc ray-plane intersect
  const a = -vec3.dot(n, w0);
  const b = vec3.dot(n, direction);

  if (Math.abs(b) < EPSILON) {
    if (a === 0) return Intersections.SamePlane;
    return Intersections.NoIntersect;
  }

  // get intersect point of ray with triangle plane
  const r = a / b;
  // ray goes away from triangle
  if (r < -EPSILON) return Intersections.NoIntersect;

  // for a segment, also test if (r > 1.0) => no intersect
  // intersect point of ray and plane
  const I = vec3.add(
    vec3.set(TEMP_4, origin),
    vec3.scale(vec3.set(TEMP_5, direction), r)
  );

  const uu = vec3.dot(u, u);
  const uv = vec3.dot(u, v);
  const vv = vec3.dot(v, v);

  const w = vec3.sub(vec3.set(TEMP_6, I), p0);

  const wu = vec3.dot(w, u);
  const wv = vec3.dot(w, v);

  const D = uv * uv - uu * vv;

  // get and test parametric coords
  const s = (uv * wv - vv * wu) / D;
  if (s < -EPSILON || s > 1.0 + EPSILON) return Intersections.NoIntersect;

  const t = (uv * wu - uu * wv) / D;
  if (t < -EPSILON || s + t > 1.0 + EPSILON) return Intersections.NoIntersect;

  vec3.set(out, u);
  vec3.scale(out, s);
  vec3.add(out, vec3.scale(vec3.set(TEMP_7, v), t));
  vec3.add(out, p0);

  return Intersections.Intersect;
}

/**
 * Determines if a ray intersect an AABB bounding box
 * @see {@link http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms}
 * @param {import("./types.js").ray} ray
 * @param {import("./types.js").aabb} aabb
 * @returns {boolean}
 */
export function hitTestAABB([origin, direction], aabb) {
  const dirFracx = 1.0 / direction[0];
  const dirFracy = 1.0 / direction[1];
  const dirFracz = 1.0 / direction[2];

  const min = aabb[0];
  const max = aabb[1];

  const minx = min[0];
  const miny = min[1];
  const minz = min[2];

  const maxx = max[0];
  const maxy = max[1];
  const maxz = max[2];

  const t1 = (minx - origin[0]) * dirFracx;
  const t2 = (maxx - origin[0]) * dirFracx;

  const t3 = (miny - origin[1]) * dirFracy;
  const t4 = (maxy - origin[1]) * dirFracy;

  const t5 = (minz - origin[2]) * dirFracz;
  const t6 = (maxz - origin[2]) * dirFracz;

  const tmin = Math.max(
    Math.max(Math.min(t1, t2), Math.min(t3, t4)),
    Math.min(t5, t6)
  );
  const tmax = Math.min(
    Math.min(Math.max(t1, t2), Math.max(t3, t4)),
    Math.max(t5, t6)
  );

  return !(tmax < 0 || tmin > tmax);
}

/**
 * Alias for {@link hitTestAABB}
 * @function
 */
export const intersectsAABB = hitTestAABB;
