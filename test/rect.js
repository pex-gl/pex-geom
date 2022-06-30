import { deepEqual, notStrictEqual, strictEqual } from "node:assert";

import { rect } from "../index.js";

const DEFAULT_RECT = Object.freeze([
  [Infinity, Infinity],
  [-Infinity, -Infinity],
]);
const POSITIVE_RECT = Object.freeze([
  [0, 0],
  [1, 1],
]);
const NEGATIVE_RECT = Object.freeze([
  [-1, -1],
  [0, 0],
]);
const NORM_RECT = Object.freeze([
  [-1, -1],
  [1, 1],
]);
const NORM_POINTS = Object.freeze([
  [-1, -1],
  [-1, 1],
  [1, 1],
  [1, -1],
]);

describe("rect", () => {
  it("create() should create a new rect", () => {
    deepEqual(rect.create(), DEFAULT_RECT);
  });
  it("empty() should reset a rect", () => {
    const r = rect.copy(NORM_RECT);
    rect.empty(r);
    deepEqual(r, DEFAULT_RECT);
  });
  it("copy() should copy a rect", () => {
    const r = rect.copy(NORM_RECT);
    notStrictEqual(r, NORM_RECT);
    deepEqual(r, NORM_RECT);
  });
  it("set() should set a rect to another", () => {
    const r = rect.create();
    rect.set(r, NORM_RECT);
    notStrictEqual(r, NORM_RECT);
    deepEqual(r, NORM_RECT);
  });
  it("isEmpty() should check if a rectangle is empty", () => {
    strictEqual(rect.isEmpty(DEFAULT_RECT), true);
    strictEqual(rect.isEmpty(POSITIVE_RECT), false);
    strictEqual(rect.isEmpty(NEGATIVE_RECT), false);
    strictEqual(rect.isEmpty(NORM_RECT), false);
  });

  it("fromPoints() should update a rectangle from a list of points", () => {
    deepEqual(rect.fromPoints(rect.copy(DEFAULT_RECT), NORM_POINTS), NORM_RECT);
  });
  it("getCorners() should return a list of 4 points from a rectangle", () => {
    deepEqual(rect.getCorners(rect.copy(NORM_RECT)), NORM_POINTS);
  });

  it("scale() should scale a rect", () => {
    deepEqual(rect.scale(rect.copy(NORM_RECT), 2), [
      [-2, -2],
      [2, 2],
    ]);
  });
  it("setSize() should set the size of a rectangle using width and height", () => {
    deepEqual(rect.setSize(rect.copy(POSITIVE_RECT), [2, 2]), [
      [0, 0],
      [2, 2],
    ]);
    deepEqual(rect.setSize(rect.copy(NEGATIVE_RECT), [2, 2]), NORM_RECT);
    // Same size
    deepEqual(rect.setSize(rect.copy(NORM_RECT), [2, 2]), NORM_RECT);
  });
  it("size() should return the size of a rectangle", () => {
    // TODO: do we need to check for Infinity in width/Height
    deepEqual(rect.size(DEFAULT_RECT), [-Infinity, -Infinity]);
    deepEqual(rect.size(POSITIVE_RECT), [1, 1]);
    deepEqual(rect.size(NEGATIVE_RECT), [1, 1]);
    deepEqual(rect.size(NORM_RECT), [2, 2]);
  });
  it("width() should return the width of a rectangle", () => {
    deepEqual(rect.width(DEFAULT_RECT), -Infinity);
    deepEqual(rect.width(POSITIVE_RECT), 1);
    deepEqual(rect.width(NEGATIVE_RECT), 1);
    deepEqual(rect.width(NORM_RECT), 2);
  });
  it("height() should return the height of a rectangle", () => {
    deepEqual(rect.height(DEFAULT_RECT), -Infinity);
    deepEqual(rect.height(POSITIVE_RECT), 1);
    deepEqual(rect.height(NEGATIVE_RECT), 1);
    deepEqual(rect.height(NORM_RECT), 2);
  });
  it("aspectRatio() should return the aspect ratio of a rectangle", () => {
    deepEqual(rect.aspectRatio(DEFAULT_RECT), NaN);
    deepEqual(rect.aspectRatio(POSITIVE_RECT), 1);
    deepEqual(rect.aspectRatio(NEGATIVE_RECT), 1);
    deepEqual(rect.aspectRatio(NORM_RECT), 1);
    deepEqual(
      rect.aspectRatio([
        [-2, -1],
        [2, 1],
      ]),
      2
    );
  });

  it("setPosition() should set the position of a rectangle", () => {
    // Positive
    deepEqual(rect.setPosition(rect.copy(DEFAULT_RECT), [1, 1]), [
      [1, 1],
      [-Infinity, -Infinity],
    ]);
    deepEqual(rect.setPosition(rect.copy(POSITIVE_RECT), [1, 1]), [
      [1, 1],
      [2, 2],
    ]);
    deepEqual(rect.setPosition(rect.copy(NEGATIVE_RECT), [1, 1]), [
      [1, 1],
      [2, 2],
    ]);
    deepEqual(rect.setPosition(rect.copy(NORM_RECT), [1, 1]), [
      [1, 1],
      [3, 3],
    ]);
    // Negative
    deepEqual(rect.setPosition(rect.copy(DEFAULT_RECT), [-1, -1]), [
      [-1, -1],
      [-Infinity, -Infinity],
    ]);
    deepEqual(rect.setPosition(rect.copy(POSITIVE_RECT), [-1, -1]), [
      [-1, -1],
      [0, 0],
    ]);
    deepEqual(rect.setPosition(rect.copy(NEGATIVE_RECT), [-1, -1]), [
      [-1, -1],
      [0, 0],
    ]);
    // Same position
    deepEqual(rect.setPosition(rect.copy(NORM_RECT), [-1, -1]), NORM_RECT);
  });

  it("center() should return the center of a rectangle", () => {
    // TODO: do we need to check for Infinity
    deepEqual(rect.center(DEFAULT_RECT), [NaN, NaN]);
    deepEqual(rect.center(POSITIVE_RECT), [0.5, 0.5]);
    deepEqual(rect.center(NEGATIVE_RECT), [-0.5, -0.5]);
    deepEqual(rect.center(NORM_RECT), [0, 0]);
  });

  it("containsPoint() should check if a point is inside a rectangle", () => {
    strictEqual(rect.containsPoint(DEFAULT_RECT, [0, 0]), false);
    strictEqual(rect.containsPoint(DEFAULT_RECT, [1, 1]), false);
    strictEqual(rect.containsPoint(DEFAULT_RECT, [-1, -1]), false);
    strictEqual(rect.containsPoint(DEFAULT_RECT, [2, 2]), false);

    strictEqual(rect.containsPoint(POSITIVE_RECT, [0, 0]), true);
    strictEqual(rect.containsPoint(POSITIVE_RECT, [1, 1]), true);
    strictEqual(rect.containsPoint(POSITIVE_RECT, [-1, -1]), false);
    strictEqual(rect.containsPoint(POSITIVE_RECT, [2, 2]), false);

    strictEqual(rect.containsPoint(NEGATIVE_RECT, [0, 0]), true);
    strictEqual(rect.containsPoint(NEGATIVE_RECT, [1, 1]), false);
    strictEqual(rect.containsPoint(NEGATIVE_RECT, [-1, -1]), true);
    strictEqual(rect.containsPoint(NEGATIVE_RECT, [2, 2]), false);

    strictEqual(rect.containsPoint(NORM_RECT, [0, 0]), true);
    strictEqual(rect.containsPoint(NORM_RECT, [1, 1]), true);
    strictEqual(rect.containsPoint(NORM_RECT, [-1, -1]), true);
    strictEqual(rect.containsPoint(NORM_RECT, [2, 2]), false);
  });

  it("containsRect() should check if a rectangle is inside another rectangle", () => {
    // Default doesn't contain itself
    strictEqual(rect.containsRect(DEFAULT_RECT, DEFAULT_RECT), false);
    strictEqual(rect.containsRect(DEFAULT_RECT, POSITIVE_RECT), false);
    strictEqual(rect.containsRect(DEFAULT_RECT, NEGATIVE_RECT), false);
    strictEqual(rect.containsRect(DEFAULT_RECT, NORM_RECT), false);

    strictEqual(rect.containsRect(POSITIVE_RECT, DEFAULT_RECT), false);
    strictEqual(rect.containsRect(POSITIVE_RECT, POSITIVE_RECT), true);
    strictEqual(rect.containsRect(POSITIVE_RECT, NEGATIVE_RECT), false);
    strictEqual(rect.containsRect(POSITIVE_RECT, NORM_RECT), false);

    strictEqual(rect.containsRect(NEGATIVE_RECT, DEFAULT_RECT), false);
    strictEqual(rect.containsRect(NEGATIVE_RECT, POSITIVE_RECT), false);
    strictEqual(rect.containsRect(NEGATIVE_RECT, NEGATIVE_RECT), true);
    strictEqual(rect.containsRect(NEGATIVE_RECT, NORM_RECT), false);

    strictEqual(rect.containsRect(NORM_RECT, DEFAULT_RECT), false);
    strictEqual(rect.containsRect(NORM_RECT, POSITIVE_RECT), true);
    strictEqual(rect.containsRect(NORM_RECT, NEGATIVE_RECT), true);
    strictEqual(rect.containsRect(NORM_RECT, NORM_RECT), true);
  });

  it("includePoint() should include a point in a rectangle", () => {
    // Expanding rect
    deepEqual(rect.includePoint(rect.copy(DEFAULT_RECT), [2, 2]), [
      [2, 2],
      [2, 2],
    ]);
    deepEqual(rect.includePoint(rect.copy(POSITIVE_RECT), [2, 2]), [
      [0, 0],
      [2, 2],
    ]);
    deepEqual(rect.includePoint(rect.copy(NEGATIVE_RECT), [2, 2]), [
      [-1, -1],
      [2, 2],
    ]);
    deepEqual(rect.includePoint(rect.copy(NORM_RECT), [2, 2]), [
      [-1, -1],
      [2, 2],
    ]);

    // Already included
    deepEqual(
      rect.includePoint(rect.copy(POSITIVE_RECT), [0, 0]),
      POSITIVE_RECT
    );
    deepEqual(
      rect.includePoint(rect.copy(NEGATIVE_RECT), [0, 0]),
      NEGATIVE_RECT
    );
    deepEqual(rect.includePoint(rect.copy(NORM_RECT), [0, 0]), NORM_RECT);
  });

  it("includeRect() should include a rectangle in another rectangle", () => {
    // Include itself
    deepEqual(
      rect.includeRect(rect.copy(DEFAULT_RECT), DEFAULT_RECT),
      [...DEFAULT_RECT].reverse()
    );
    deepEqual(
      rect.includeRect(rect.copy(POSITIVE_RECT), POSITIVE_RECT),
      POSITIVE_RECT
    );
    deepEqual(
      rect.includeRect(rect.copy(NEGATIVE_RECT), NEGATIVE_RECT),
      NEGATIVE_RECT
    );
    deepEqual(rect.includeRect(rect.copy(NORM_RECT), NORM_RECT), NORM_RECT);

    // Include to default
    deepEqual(
      rect.includeRect(rect.copy(DEFAULT_RECT), POSITIVE_RECT),
      POSITIVE_RECT
    );
    deepEqual(
      rect.includeRect(rect.copy(DEFAULT_RECT), NEGATIVE_RECT),
      NEGATIVE_RECT
    );
    deepEqual(rect.includeRect(rect.copy(DEFAULT_RECT), NORM_RECT), NORM_RECT);

    // Commutative
    deepEqual(rect.includeRect(rect.copy(POSITIVE_RECT), NEGATIVE_RECT), [
      [-1, -1],
      [1, 1],
    ]);
    deepEqual(rect.includeRect(rect.copy(NEGATIVE_RECT), POSITIVE_RECT), [
      [-1, -1],
      [1, 1],
    ]);

    // Basic
    deepEqual(rect.includeRect(rect.copy(NORM_RECT), POSITIVE_RECT), [
      [-1, -1],
      [1, 1],
    ]);
    deepEqual(rect.includeRect(rect.copy(NORM_RECT), NEGATIVE_RECT), [
      [-1, -1],
      [1, 1],
    ]);
  });

  it("mapPoint() should map a point into the dimensions of a rectangle", () => {
    deepEqual(rect.mapPoint(NORM_RECT, [0, 0]), [1, 1]);
    deepEqual(rect.mapPoint(POSITIVE_RECT, [0, 0]), [0, 0]);
    deepEqual(rect.mapPoint(NEGATIVE_RECT, [0, 0]), [1, 1]);

    deepEqual(rect.mapPoint(NORM_RECT, [100, 100]), [2, 2]);
    deepEqual(rect.mapPoint(POSITIVE_RECT, [100, 100]), [1, 1]);
    deepEqual(rect.mapPoint(NEGATIVE_RECT, [100, 100]), [1, 1]);

    deepEqual(rect.mapPoint(NORM_RECT, [1, 1]), [2, 2]);
    deepEqual(rect.mapPoint(POSITIVE_RECT, [1, 1]), [1, 1]);
    deepEqual(rect.mapPoint(NEGATIVE_RECT, [1, 1]), [1, 1]);
  });

  it("clampPoint() should map a point into the dimensions of a rectangle", () => {
    deepEqual(rect.clampPoint(NORM_RECT, [0, 0]), [0, 0]);
    deepEqual(rect.clampPoint(NORM_RECT, [2, 2]), [1, 1]);
    deepEqual(rect.clampPoint(NORM_RECT, [-2, -2]), [-1, -1]);

    deepEqual(rect.clampPoint(POSITIVE_RECT, [0, 0]), [0, 0]);
    deepEqual(rect.clampPoint(POSITIVE_RECT, [2, 2]), [1, 1]);
    deepEqual(rect.clampPoint(POSITIVE_RECT, [-2, -2]), [0, 0]);

    deepEqual(rect.clampPoint(NEGATIVE_RECT, [0, 0]), [0, 0]);
    deepEqual(rect.clampPoint(NEGATIVE_RECT, [2, 2]), [0, 0]);
    deepEqual(rect.clampPoint(NEGATIVE_RECT, [-2, -2]), [-1, -1]);
  });
});
