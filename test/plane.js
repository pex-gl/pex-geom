import { deepEqual } from "node:assert";

import { ORIGIN, Y_UP_PLANE } from "./constants.js";

import { plane } from "../index.js";

describe("plane", () => {
  it("create() should create a new plane with point and normal", () => {
    deepEqual(plane.create(), [ORIGIN, [0, 1, 0]]);
  });

  describe("side()", () => {
    it("should return -1 if the point is on the side of the normal", () => {
      deepEqual(plane.side(Y_UP_PLANE, [0, 1, 0]), plane.Side.Same);
    });
    it("should return 1 if the point is on the opposite side of the normal", () => {
      deepEqual(plane.side(Y_UP_PLANE, [0, -1, 0]), plane.Side.Opposite);
    });
    it("should return 0 if the point is on the plane", () => {
      deepEqual(plane.side(Y_UP_PLANE, ORIGIN), plane.Side.OnPlane);
    });
  });
});
