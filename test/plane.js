import { deepEqual } from "assert";

import { ORIGIN, Y_UP_PLANE } from "./constants.js";

import { plane } from "../index.js";

describe("plane", () => {
  it("create() should create a new plane with point and normal", () => {
    deepEqual(plane.create(), [ORIGIN, [0, 1, 0]]);
  });

  describe("getRayIntersection()", () => {
    it("should find the intersection of the Y up plane and Y up ray at 0, 0, 0", () => {
      const point = [];
      plane.getRayIntersection(Y_UP_PLANE, [ORIGIN, [0, 1, 0]], point);
      deepEqual(point, ORIGIN);
    });
    it("should find the intersection of the Y up plane and a negative linear ray at 0, 0, 0", () => {
      const point = [];
      plane.getRayIntersection(Y_UP_PLANE, [ORIGIN, [-1, -1, -1]], point);
      deepEqual(point, ORIGIN);
    });
    it("should return 1 if the plane and ray intersect", () => {
      deepEqual(plane.getRayIntersection(Y_UP_PLANE, [ORIGIN, [0, 1, 0]]), 1);
    });
    it("should return -1 if the plane and ray don't intersect (ray on the plane)", () => {
      deepEqual(
        plane.getRayIntersection(Y_UP_PLANE, [
          [0, 0, 1],
          [0, 0, 2],
        ]),
        -1
      );
    });
    it("should return -2 if the plane and ray don't intersect (ray parallel to plane)", () => {
      deepEqual(
        plane.getRayIntersection(Y_UP_PLANE, [
          [0, 1, 1],
          [0, 1, 2],
        ]),
        -2
      );
    });
  });

  describe("side()", () => {
    it("should return -1 if the point is on the side of the normal", () => {
      deepEqual(plane.side(Y_UP_PLANE, [0, 1, 0]), -1);
    });
    it("should return 1 if the point is on the opposite side of the normal", () => {
      deepEqual(plane.side(Y_UP_PLANE, [0, -1, 0]), 1);
    });
    it("should return 0 if the point is on the plane", () => {
      deepEqual(plane.side(Y_UP_PLANE, ORIGIN), 0);
    });
  });
});
