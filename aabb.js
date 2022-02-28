export function create() {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  return [min, max];
}

export function set(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[0][2] = b[0][2];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  a[1][2] = b[1][2];
}

export function copy(b) {
  const a = create();
  set(a, b);
  return a;
}

export function fromPoints(points) {
  const aabb = create();
  const min = aabb[0];
  const max = aabb[1];

  for (let i = 0, len = points.length; i < len; i++) {
    const p = points[i];
    min[0] = Math.min(min[0], p[0]);
    min[1] = Math.min(min[1], p[1]);
    min[2] = Math.min(min[2], p[2]);
    max[0] = Math.max(max[0], p[0]);
    max[1] = Math.max(max[1], p[1]);
    max[2] = Math.max(max[2], p[2]);
  }

  return aabb;
}

export function center(aabb, out) {
  if (out === undefined) {
    out = [0, 0, 0];
  }
  out[0] = (aabb[0][0] + aabb[1][0]) / 2;
  out[1] = (aabb[0][1] + aabb[1][1]) / 2;
  out[2] = (aabb[0][2] + aabb[1][2]) / 2;
  return out;
}

export function size(aabb, out) {
  if (out === undefined) {
    out = [0, 0, 0];
  }
  out[0] = Math.abs(aabb[1][0] - aabb[0][0]);
  out[1] = Math.abs(aabb[1][1] - aabb[0][1]);
  out[2] = Math.abs(aabb[1][2] - aabb[0][2]);
  return out;
}

export function isEmpty(aabb) {
  return (
    aabb[0][0] > aabb[1][0] ||
    aabb[0][1] > aabb[1][1] ||
    aabb[0][2] > aabb[1][2]
  );
}

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

export function includePoint(a, p) {
  a[0][0] = Math.min(a[0][0], p[0]);
  a[0][1] = Math.min(a[0][1], p[1]);
  a[0][2] = Math.min(a[0][2], p[2]);
  a[1][0] = Math.max(a[1][0], p[0]);
  a[1][1] = Math.max(a[1][1], p[1]);
  a[1][2] = Math.max(a[1][2], p[2]);
  return a;
}
