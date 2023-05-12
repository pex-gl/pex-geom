import { describe, it } from "node:test";
import { deepEqual, notStrictEqual, strictEqual } from "node:assert";

import { ORIGIN } from "./constants.js";
import { aabb } from "../index.js";

const DEFAULT_BOX = Object.freeze([
  [Infinity, Infinity, Infinity],
  [-Infinity, -Infinity, -Infinity],
]);
const NORM_BOX = Object.freeze([
  [-1, -1, -1],
  [1, 1, 1],
]);
const POSITIVE_BOX = Object.freeze([ORIGIN, [1, 1, 1]]);
const NEGATIVE_BOX = Object.freeze([[-1, -1, -1], ORIGIN]);
const REVERSE_POSITIVE_BOX = Object.freeze([...POSITIVE_BOX].reverse());
const REVERSE_NEGATIVE_BOX = Object.freeze([...NEGATIVE_BOX].reverse());
const NORM_POINTS = Object.freeze([
  [-1, -1, -1],
  [1, -1, -1],
  [1, -1, 1],
  [-1, -1, 1],
  [-1, 1, -1],
  [1, 1, -1],
  [1, 1, 1],
  [-1, 1, 1],
]);
const NORM_POINTS_F32 = new Float32Array(NORM_POINTS.flat());

describe("aabb", () => {
  it("create() should create a new bounding box with origin and direction", () => {
    deepEqual(aabb.create(), DEFAULT_BOX);
  });
  it("empty() should reset a bounding box", () => {
    const bbox = aabb.copy(NORM_BOX);
    aabb.empty(bbox);
    deepEqual(bbox, DEFAULT_BOX);
  });
  it("copy() should copy a bounding box", () => {
    const bbox = aabb.copy(NORM_BOX);
    notStrictEqual(bbox, NORM_BOX);
    deepEqual(bbox, NORM_BOX);
  });
  it("set() should set a bounding box to another", () => {
    const bbox = aabb.create();
    aabb.set(bbox, NORM_BOX);
    notStrictEqual(bbox, NORM_BOX);
    deepEqual(bbox, NORM_BOX);
  });
  it("isEmpty() should check if a bounding box is empty", () => {
    strictEqual(aabb.isEmpty(DEFAULT_BOX), true);
    strictEqual(aabb.isEmpty(POSITIVE_BOX), false);
    strictEqual(aabb.isEmpty(REVERSE_POSITIVE_BOX), true);
    strictEqual(aabb.isEmpty(NEGATIVE_BOX), false);
    strictEqual(aabb.isEmpty(REVERSE_NEGATIVE_BOX), true);
    strictEqual(aabb.isEmpty(NORM_BOX), false);
  });

  it("fromPoints() should update a bounding box from a list of points", () => {
    deepEqual(aabb.fromPoints(aabb.copy(DEFAULT_BOX), NORM_POINTS), NORM_BOX);
  });
  it("fromPoints() should update a bounding box from a list of points passed as flat array", () => {
    deepEqual(
      aabb.fromPoints(aabb.copy(DEFAULT_BOX), NORM_POINTS_F32),
      NORM_BOX
    );
  });
  it("getCorners() should return a list of 8 points from a bounding box", () => {
    deepEqual(aabb.getCorners(aabb.copy(NORM_BOX)), NORM_POINTS);
  });

  it("center() should return the center of a bounding box", () => {
    // TODO: do we need to check for isEmpty?
    deepEqual(aabb.center(DEFAULT_BOX), [NaN, NaN, NaN]);
    deepEqual(aabb.center(POSITIVE_BOX), [0.5, 0.5, 0.5]);
    deepEqual(aabb.center(REVERSE_POSITIVE_BOX), [0.5, 0.5, 0.5]);
    deepEqual(aabb.center(NEGATIVE_BOX), [-0.5, -0.5, -0.5]);
    deepEqual(aabb.center(REVERSE_NEGATIVE_BOX), [-0.5, -0.5, -0.5]);
    deepEqual(aabb.center(NORM_BOX), ORIGIN);
  });
  it("size() should return the size of a bounding box", () => {
    deepEqual(aabb.size(DEFAULT_BOX), [Infinity, Infinity, Infinity]);
    deepEqual(aabb.size(POSITIVE_BOX), [1, 1, 1]);
    deepEqual(aabb.size(REVERSE_POSITIVE_BOX), [1, 1, 1]);
    deepEqual(aabb.size(NEGATIVE_BOX), [1, 1, 1]);
    deepEqual(aabb.size(REVERSE_NEGATIVE_BOX), [1, 1, 1]);
    deepEqual(aabb.size(NORM_BOX), [2, 2, 2]);
  });

  it("containsPoint() should check if a point is inside a bounding box", () => {
    strictEqual(aabb.containsPoint(DEFAULT_BOX, [0, 0, 0]), false);
    strictEqual(aabb.containsPoint(DEFAULT_BOX, [1, 1, 1]), false);
    strictEqual(aabb.containsPoint(DEFAULT_BOX, [-1, -1, -1]), false);
    strictEqual(aabb.containsPoint(DEFAULT_BOX, [2, 2, 2]), false);

    strictEqual(aabb.containsPoint(POSITIVE_BOX, [0, 0, 0]), true);
    strictEqual(aabb.containsPoint(POSITIVE_BOX, [1, 1, 1]), true);
    strictEqual(aabb.containsPoint(POSITIVE_BOX, [-1, -1, -1]), false);
    strictEqual(aabb.containsPoint(POSITIVE_BOX, [2, 2, 2]), false);

    strictEqual(aabb.containsPoint(NEGATIVE_BOX, [0, 0, 0]), true);
    strictEqual(aabb.containsPoint(NEGATIVE_BOX, [1, 1, 1]), false);
    strictEqual(aabb.containsPoint(NEGATIVE_BOX, [-1, -1, -1]), true);
    strictEqual(aabb.containsPoint(NEGATIVE_BOX, [2, 2, 2]), false);

    strictEqual(aabb.containsPoint(NORM_BOX, [0, 0, 0]), true);
    strictEqual(aabb.containsPoint(NORM_BOX, [1, 1, 1]), true);
    strictEqual(aabb.containsPoint(NORM_BOX, [-1, -1, -1]), true);
    strictEqual(aabb.containsPoint(NORM_BOX, [2, 2, 2]), false);
  });

  it("includeAABB() should include a bounding box in another", () => {
    // Empty a
    deepEqual(
      aabb.includeAABB(aabb.copy(DEFAULT_BOX), POSITIVE_BOX),
      POSITIVE_BOX
    );
    // Empty b
    deepEqual(
      aabb.includeAABB(POSITIVE_BOX, aabb.copy(DEFAULT_BOX)),
      POSITIVE_BOX
    );

    deepEqual(
      aabb.includeAABB(aabb.copy(POSITIVE_BOX), NEGATIVE_BOX),
      NORM_BOX
    );
  });

  it("includePoint() should include a point in a bounding box", () => {
    deepEqual(
      aabb.includePoint(aabb.copy(POSITIVE_BOX), [-1, -1, -1]),
      NORM_BOX
    );
    deepEqual(aabb.includePoint(aabb.copy(NEGATIVE_BOX), [1, 1, 1]), NORM_BOX);
    // Collapse itself
    deepEqual(aabb.includePoint(aabb.copy(DEFAULT_BOX), ORIGIN), [
      ORIGIN,
      ORIGIN,
    ]);
  });
  it("toString() should print a bounding box to a string", () => {
    deepEqual(
      aabb.toString(DEFAULT_BOX),
      "[[Infinity, Infinity, Infinity], [-Infinity, -Infinity, -Infinity]]"
    );
    deepEqual(aabb.toString(NORM_BOX), "[[-1, -1, -1], [1, 1, 1]]");
    deepEqual(aabb.toString(POSITIVE_BOX), "[[0, 0, 0], [1, 1, 1]]");
  });
});
