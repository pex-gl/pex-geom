import pexMath from "pex-math";

import { hitTestPlane } from "./ray.js";

const { vec3 } = pexMath;

const tmp = vec3.create();

export function create() {
  return [
    [0, 0, 0],
    [0, 1, 0],
  ];
}

export function getRayIntersection(p, r, out) {
  return hitTestPlane(r, p[0], p[1], out);
}

export function side(plane, point) {
  const planePoint = plane[0];
  const planeNormal = plane[1];
  vec3.set(tmp, planePoint);
  vec3.sub(tmp, point);
  vec3.normalize(tmp);
  const dot = vec3.dot(tmp, planeNormal);
  if (dot > 0) return 1;
  if (dot < 0) return -1;
  return 0;
}
