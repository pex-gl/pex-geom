/**
 * @typedef {number[][]} AABB An axis-aligned bounding box defined by two min
 *   and max 3D points (eg. [[minX, minY, minZ], [maxX, maxY, maxZ]]).
 */

/**
 * @typedef {number[][]} Plane A plane defined by a 3D point and a normal vector
 *   perpendicular to the plane’s surface (eg. [[pointX, pointY, pointZ],
 *   [normalX, normalY, normalZ]]).
 */

/**
 * @typedef {number[][]} Ray A ray defined by a starting 3D point origin and a
 *   3D direction vector (eg. [[originX, originY, originZ], [directionX,
 *   directionY, directionZ]).
 */

/**
 * @typedef {number[][]} Rect A rectangle defined by two diagonally opposite 2D
 *   points (eg. [[minX, minY], [maxX, maxY]]).
 */

/** @typedef {number[][]} Triangle A triangle defined by three 3D points. */

export {};
