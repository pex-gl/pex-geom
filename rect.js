export function create() {
  return [
    [Infinity, Infinity],
    [-Infinity, -Infinity],
  ];
}

export function zero() {
  return [
    [0, 0],
    [0, 0],
  ];
}

export function copy(a) {
  return [a[0].slice(0), a[1].slice()];
}

export function set(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  return a;
}

export function scale(a, n) {
  a[0][0] *= n;
  a[0][1] *= n;
  a[1][0] *= n;
  a[1][1] *= n;
  return a;
}

export function setSize(a, size) {
  a[1][0] = a[0][0] + size[0];
  a[1][1] = a[0][1] + size[1];
  return a;
}

export function getSize(a, out) {
  const width = getWidth(a);
  const height = getHeight(a);
  if (out === undefined) {
    return [width, height];
  }
  out[0] = width;
  out[1] = height;
  return out;
}

export function getWidth(a) {
  return a[1][0] - a[0][0];
}

export function getHeight(a) {
  return a[1][1] - a[0][1];
}

export function getAspectRatio(a) {
  return getWidth(a) / getHeight(a);
}

export function setPosition(a, position) {
  const x = position[0];
  const y = position[1];

  a[0][0] = x;
  a[0][1] = y;
  a[1][0] = x + getWidth(a);
  a[1][1] = y + getHeight(a);
  return a;
}

export function getCenter(a, out) {
  const x = getWidth(a) * 0.5;
  const y = getHeight(a) * 0.5;
  if (out === undefined) {
    return [x, y];
  }
  out[0] = x;
  out[1] = y;
  return out;
}

export function containsPoint(a, p) {
  const x = p[0];
  const y = p[1];
  return x >= a[0][0] && x <= a[1][0] && y >= a[0][1] && y <= a[1][1];
}

export function containsRect(a, b) {
  return containsPoint(a, b[0]) && containsPoint(a, b[1]);
}

export function includePoint(a, point) {
  const x = point[0];
  const y = point[1];
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];

  a[0][0] = minx > x ? x : minx;
  a[0][1] = miny > y ? y : miny;
  a[1][0] = maxx < x ? x : maxx;
  a[1][1] = maxy < y ? y : maxy;

  return a;
}

export function includeRect(a, rect) {
  includePoint(a, rect[0]);
  includePoint(a, rect[1]);
  return a;
}

export function mapPoint(a, point) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];
  const x = point[0];
  const y = point[1];

  point[0] = Math.max(minx, Math.min(x, maxx)) - minx;
  point[1] = Math.max(miny, Math.min(y, maxy)) - miny;
  return point;
}

export function clampPoint(a, point) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];

  point[0] = Math.max(minx, Math.min(point[0], maxx));
  point[1] = Math.max(miny, Math.min(point[1], maxy));
  return point;
}

export function setEmpty(a) {
  a[0][0] = a[0][1] = Infinity;
  a[1][0] = a[1][1] = -Infinity;
  return a;
}

export function isEmpty(a) {
  return a[0][0] > a[1][0] || a[0][1] > a[1][1];
}

export function createFromPoints(points) {
  const r = create();
  for (let i = 0, l = points.length; i < l; i++) {
    includePoint(r, points[i]);
  }

  return r;
}
