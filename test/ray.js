import { deepEqual } from "assert";

import {
  Y_UP_PLANE,
  X_UP_RAY,
  Y_UP_RAY,
  Z_UP_RAY,
  Y_DOWN_RAY,
  XYZ_RAY,
  ORIGIN,
} from "./constants.js";

import { ray } from "../index.js";

const { INTERSECTIONS } = ray;

describe("ray", () => {
  it("create() should create a new ray with origin and direction", () => {
    deepEqual(ray.create(), [ORIGIN, [0, 0, 1]]);
  });

  describe("hitTestPlane()", () => {
    it("should return 1 if the ray is intersecting", () => {
      deepEqual(
        ray.hitTestPlane(Y_UP_RAY, ...Y_UP_PLANE),
        INTERSECTIONS.INTERSECT
      );
      deepEqual(
        ray.hitTestPlane(Y_DOWN_RAY, ...Y_UP_PLANE),
        INTERSECTIONS.INTERSECT
      );
      deepEqual(
        ray.hitTestPlane(XYZ_RAY, ...Y_UP_PLANE),
        INTERSECTIONS.INTERSECT
      );
    });
    it("should set the plane intersection point", () => {
      const out = [];
      ray.hitTestPlane(Y_UP_RAY, ...Y_UP_PLANE, out);
      deepEqual(out, ORIGIN);
    });
    it("should return -1 if the ray is not intersecting (ray on the plane)", () => {
      deepEqual(
        ray.hitTestPlane(Z_UP_RAY, ...Y_UP_PLANE),
        INTERSECTIONS.SAME_PLANE
      );
    });
    it("should return -2 if the ray is not intersecting (ray parallel to plane)", () => {
      deepEqual(
        ray.hitTestPlane(
          [
            [0, 1, 0],
            [0, 1, 1],
          ],
          ...Y_UP_PLANE
        ),
        INTERSECTIONS.PARALLEL
      );
    });
  });

  describe("hitTestTriangle()", () => {
    // Triangle with normal up Y
    const triangle = [
      [0, 0, 1],
      [1, 0, -1],
      [-1, 0, -1],
    ];

    it("should intersect the triangle", () => {
      deepEqual(
        ray.hitTestTriangle(Y_UP_RAY, triangle),
        INTERSECTIONS.INTERSECT
      );
      deepEqual(
        ray.hitTestTriangle(Y_DOWN_RAY, triangle),
        INTERSECTIONS.INTERSECT
      );
      deepEqual(
        ray.hitTestTriangle(XYZ_RAY, triangle),
        INTERSECTIONS.INTERSECT
      );
    });
    it("should set the triangle intersection point", () => {
      const out = [];
      ray.hitTestTriangle(Y_UP_RAY, triangle, out);
      deepEqual(out, ORIGIN);
    });
    it("should not intersect if the triangle is degenerate", () => {
      deepEqual(
        ray.hitTestTriangle(Y_UP_RAY, [
          [0, 0, 1],
          [0, 0, 1],
          [1, 0, -1],
        ]),
        INTERSECTIONS.TRIANGLE_DEGENERATE
      );
    });
    it("should not intersect if a ray is outside the triangle", () => {
      deepEqual(
        ray.hitTestTriangle(
          [
            [10, 0, 0],
            [0, 1, 0],
          ],
          triangle
        ),
        INTERSECTIONS.NO_INTERSECT
      );
    });
    it("should not intersect if a ray is outside the triangle (ray parallel to triangle)", () => {
      deepEqual(
        ray.hitTestTriangle(
          [
            [0, 1, 0],
            [0, 0, 1],
          ],
          triangle
        ),
        INTERSECTIONS.NO_INTERSECT
      );
    });
    it("should intersect if a ray is coplanar to the triangle", () => {
      deepEqual(
        ray.hitTestTriangle(X_UP_RAY, triangle),
        INTERSECTIONS.SAME_PLANE
      );
      deepEqual(
        ray.hitTestTriangle(Z_UP_RAY, triangle),
        INTERSECTIONS.SAME_PLANE
      );
    });
  });

  describe("hitTestAABB()", () => {
    const box = [
      [-1, -1, -1],
      [1, 1, 1],
    ];
    it("should intersect the box", () => {
      deepEqual(ray.hitTestAABB(Y_UP_RAY, box), INTERSECTIONS.INTERSECT);
      deepEqual(ray.hitTestAABB(Y_DOWN_RAY, box), INTERSECTIONS.INTERSECT);
      deepEqual(ray.hitTestAABB(XYZ_RAY, box), INTERSECTIONS.INTERSECT);
      deepEqual(ray.hitTestAABB(Z_UP_RAY, box), INTERSECTIONS.INTERSECT);
    });
    it("should not intersect if a ray is outside the box", () => {
      deepEqual(
        ray.hitTestAABB(
          [
            [-2, 0, 0],
            [-1, 0, 0],
          ],
          box
        ),
        INTERSECTIONS.NO_INTERSECT
      );
    });
    it("should intersect if a ray is coplanar to one of the boxes sides", () => {
      deepEqual(
        ray.hitTestAABB(
          [
            [0, 0, 1],
            [0, 0, 1],
          ],
          box
        ),
        INTERSECTIONS.INTERSECT
      );
    });
  });
});
