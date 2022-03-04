/**
 * @typedef {number[][]} rect A rectangle defined by two diagonally opposite 2D points.
 */

/**
 * Creates a new rectangle.
 * @returns {rect}
 */
export function create() {
  return [
    [Infinity, Infinity],
    [-Infinity, -Infinity],
  ];
}

/**
 * Reset a rectangle.
 * @param {rect} a
 * @returns {rect}
 */
export function empty(a) {
  a[0][0] = a[0][1] = Infinity;
  a[1][0] = a[1][1] = -Infinity;
  return a;
}

/**
 * Copies a rectangle.
 * @param {rect} b
 * @returns {rect}
 */
export function copy(a) {
  return [a[0].slice(), a[1].slice()];
}

/**
 * Sets a rectangle to another.
 * @param {rect} a
 * @param {rect} b
 * @returns {rect}
 */
export function set(a, b) {
  a[0][0] = b[0][0];
  a[0][1] = b[0][1];
  a[1][0] = b[1][0];
  a[1][1] = b[1][1];
  return a;
}

/**
 * Checks if a rectangle is empty.
 * @param {rect} a
 * @returns {boolean}
 */
export function isEmpty(a) {
  return a[0][0] > a[1][0] || a[0][1] > a[1][1];
}

/**
 * Creates a rectangle from a list of points.
 * @param {import("pex-math").vec2[]} points
 * @returns {rect}
 */
export function fromPoints(points) {
  return setPoints(create(), points);
}

/**
 * Updates a rectangle from a list of points.
 * @param {rect} a
 * @param {import("pex-math").vec2[]} points
 * @returns {rect}
 */
export function setPoints(a, points) {
  for (let i = 0; i < points.length; i++) {
    includePoint(a, points[i]);
  }

  return a;
}

/**
 * Returns a list of 4 points from a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2[]} points
 * @returns
 */
export function getPoints(a, points = []) {
  points[0] = a[0].slice();
  points[1] = [a[0][1], a[1][0]];
  points[2] = a[1].slice();
  points[3] = [a[1][0], a[0][1]];
  return points;
}

/**
 * Scales a rectangle.
 * @param {rect} a
 * @param {number} n
 * @returns {rect}
 */
export function scale(a, n) {
  a[0][0] *= n;
  a[0][1] *= n;
  a[1][0] *= n;
  a[1][1] *= n;
  return a;
}

/**
 * Sets the size of a rectangle using width and height.
 * @param {rect} a
 * @param {import("pex-math").vec2} size
 * @returns {rect}
 */
export function setSize(a, size) {
  a[1][0] = a[0][0] + size[0];
  a[1][1] = a[0][1] + size[1];
  return a;
}

/**
 * Returns the size of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} out
 * @returns {import("pex-math").vec2}
 */
export function size(a, out = []) {
  out[0] = width(a);
  out[1] = height(a);
  return out;
}

/**
 * Returns the width of a rectangle.
 * @param {rect} a
 * @returns {number}
 */
export function width(a) {
  return a[1][0] - a[0][0];
}

/**
 * Returns the height of a rectangle.
 * @param {rect} a
 * @returns {number}
 */
export function height(a) {
  return a[1][1] - a[0][1];
}

/**
 * Returns the aspect ratio of a rectangle.
 * @param {rect} a
 * @returns {number}
 */
export function aspectRatio(a) {
  return width(a) / height(a);
}

/**
 * Sets the position of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {rect}
 */
export function setPosition(a, [x, y]) {
  const w = width(a);
  const h = height(a);
  a[0][0] = x;
  a[0][1] = y;
  a[1][0] = x + w;
  a[1][1] = y + h;
  return a;
}

/**
 * Returns the center of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} out
 * @returns {rect}
 */
export function center(a, out = []) {
  out[0] = a[0][0] + width(a) * 0.5;
  out[1] = a[0][1] + height(a) * 0.5;
  return out;
}

/**
 * Checks if a point is inside a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {boolean}
 */
export function containsPoint(a, [x, y]) {
  return x >= a[0][0] && x <= a[1][0] && y >= a[0][1] && y <= a[1][1];
}

/**
 * Checks if a rectangle is inside another rectangle.
 * @param {rect} a
 * @param {rect} b
 * @returns {boolean}
 */
export function containsRect(a, b) {
  return containsPoint(a, b[0]) && containsPoint(a, b[1]);
}

/**
 * Includes a point in a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {rect}
 */
export function includePoint(a, [x, y]) {
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

/**
 * Includes a rectangle in another rectangle.
 * @param {rect} a
 * @param {rect} b
 * @returns
 */
export function includeRect(a, b) {
  includePoint(a, b[0]);
  includePoint(a, b[1]);
  return a;
}

/**
 * Maps a point into the dimensions of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {import("pex-math").vec2}
 */
export function mapPoint(a, p) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];

  p[0] = Math.max(minx, Math.min(p[0], maxx)) - minx;
  p[1] = Math.max(miny, Math.min(p[1], maxy)) - miny;
  return p;
}

/**
 * Clamps a point into the dimensions of a rectangle.
 * @param {rect} a
 * @param {import("pex-math").vec2} p
 * @returns {import("pex-math").vec2}
 */
export function clampPoint(a, p) {
  const minx = a[0][0];
  const miny = a[0][1];
  const maxx = a[1][0];
  const maxy = a[1][1];

  p[0] = Math.max(minx, Math.min(p[0], maxx));
  p[1] = Math.max(miny, Math.min(p[1], maxy));
  return p;
}
