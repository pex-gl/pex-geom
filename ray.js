import pexMath from "pex-math";

const { vec3 } = pexMath;

const TEMP_VEC3_0 = vec3.create();
const TEMP_VEC3_1 = vec3.create();
const TEMP_VEC3_2 = vec3.create();
const TEMP_VEC3_3 = vec3.create();
const TEMP_VEC3_4 = vec3.create();
const TEMP_VEC3_5 = vec3.create();
const TEMP_VEC3_6 = vec3.create();
const TEMP_VEC3_7 = vec3.create();

const EPSILON = 0.000001;

export function create() {
  return [
    [0, 0, 0],
    [0, 0, 1],
  ];
}

export function hitTestTriangle(a, triangle, out) {
  const p0 = triangle[0];
  const p1 = triangle[1];
  const p2 = triangle[2];

  const origin = a[0];
  const direction = a[1];

  const u = vec3.sub(vec3.set(TEMP_VEC3_0, p1), p0);
  const v = vec3.sub(vec3.set(TEMP_VEC3_1, p2), p0);
  const n = vec3.cross(vec3.set(TEMP_VEC3_2, u), v);

  if (vec3.length(n) < EPSILON) {
    return -1;
  }

  const w0 = vec3.sub(vec3.set(TEMP_VEC3_3, origin), p0);
  const a_ = -vec3.dot(n, w0);
  const b = vec3.dot(n, direction);

  if (Math.abs(b) < EPSILON) {
    if (a_ === 0) {
      return -2;
    }
    return -3;
  }

  const r = a_ / b;
  if (r < -EPSILON) {
    return -4;
  }

  const I = vec3.add(
    vec3.set(TEMP_VEC3_4, origin),
    vec3.scale(vec3.set(TEMP_VEC3_5, direction), r)
  );

  const uu = vec3.dot(u, u);
  const uv = vec3.dot(u, v);
  const vv = vec3.dot(v, v);

  const w = vec3.sub(vec3.set(TEMP_VEC3_6, I), p0);

  const wu = vec3.dot(w, u);
  const wv = vec3.dot(w, v);

  const D = uv * uv - uu * vv;

  const s = (uv * wv - vv * wu) / D;

  if (s < -EPSILON || s > 1.0 + EPSILON) {
    return -5;
  }

  const t = (uv * wu - uu * wv) / D;

  if (t < -EPSILON || s + t > 1.0 + EPSILON) {
    return -6;
  }

  out = out === undefined ? vec3.create() : out;

  vec3.set(out, u);
  vec3.scale(out, s);
  vec3.add(out, vec3.scale(vec3.set(TEMP_VEC3_7, v), t));
  vec3.add(out, p0);

  return 1;
}

export function hitTestPlane(a, point, normal, out) {
  const origin = vec3.set(TEMP_VEC3_0, a[0]);
  const direction = vec3.set(TEMP_VEC3_1, a[1]);

  point = vec3.set(TEMP_VEC3_2, point);

  const dotDirectionNormal = vec3.dot(direction, normal);

  if (dotDirectionNormal === 0) {
    return -1;
  }

  const t = vec3.dot(vec3.sub(point, origin), normal) / dotDirectionNormal;

  if (t < 0) {
    return -2;
  }

  out = out === undefined ? vec3.create() : out;
  vec3.set(out, vec3.add(origin, vec3.scale(direction, t)));
  return 1;
}

// http://gamedev.stackexchange.com/questions/18436/most-efficient-aabb-vs-ray-collision-algorithms
export function intersectsAABB(a, aabb) {
  const origin = a[0];
  const direction = a[1];

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
