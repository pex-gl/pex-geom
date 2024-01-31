import { describe, it } from "node:test";
import { aabb } from "../index.js";

const run = (cb, iterations = 1e6) => {
  for (let i = 0; i < iterations; i++) {
    cb();
  }
};

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
const NORM_POINTS_U16 = new Uint16Array(NORM_POINTS.flat());
const NORM_POINTS_F32 = new Float32Array(NORM_POINTS.flat());
const RANDOM_1K_LENGTH_F32 = Float32Array.from({ length: 1024 }, () =>
  Math.random(),
);
const RANDOM_1K_POINTS_F32 = Float32Array.from({ length: 1_000 * 3 }, () =>
  Math.random(),
);
const RANDOM_10K_POINTS_F32 = Float32Array.from({ length: 10_000 * 3 }, () =>
  Math.random(),
);
const RANDOM_100K_POINTS_F32 = Float32Array.from({ length: 100_000 * 3 }, () =>
  Math.random(),
);

// Fixtures
function includePointSlice(a, p) {
  a[0][0] = Math.min(a[0][0], p[0]);
  a[0][1] = Math.min(a[0][1], p[1]);
  a[0][2] = Math.min(a[0][2], p[2]);
  a[1][0] = Math.max(a[1][0], p[0]);
  a[1][1] = Math.max(a[1][1], p[1]);
  a[1][2] = Math.max(a[1][2], p[2]);
  return a;
}

function fromPointsSlice(a, points) {
  const isTypedArray = !Array.isArray(points);
  for (let i = 0; i < points.length / (isTypedArray ? 3 : 1); i++) {
    includePointSlice(a, isTypedArray ? points.slice(i * 3) : points[i]);
  }

  return a;
}

function includePointOffset(a, p, i = 0) {
  a[0][0] = Math.min(a[0][0], p[i + 0]);
  a[0][1] = Math.min(a[0][1], p[i + 1]);
  a[0][2] = Math.min(a[0][2], p[i + 2]);
  a[1][0] = Math.max(a[1][0], p[i + 0]);
  a[1][1] = Math.max(a[1][1], p[i + 1]);
  a[1][2] = Math.max(a[1][2], p[i + 2]);
  return a;
}
function fromPointsOffset(a, points) {
  const isTypedArray = !Array.isArray(points);
  for (let i = 0; i < points.length / (isTypedArray ? 3 : 1); i++) {
    if (isTypedArray) {
      includePointOffset(a, points, i * 3);
    } else {
      includePointOffset(a, points[i]);
    }
  }

  return a;
}

function fromPointsOffsetPrecomputeLength(a, points) {
  const isTypedArray = !Array.isArray(points);
  const l = points.length / (isTypedArray ? 3 : 1);
  for (let i = 0; i < l; i++) {
    if (isTypedArray) {
      includePointOffset(a, points, i * 3);
    } else {
      includePointOffset(a, points[i]);
    }
  }

  return a;
}
function fromPointsOffsetIfCheckOutside(a, points) {
  const isTypedArray = !Array.isArray(points);
  const l = points.length;
  if (isTypedArray) {
    for (let i = 0; i < l; i += 3) {
      includePointOffset(a, points, i);
    }
  } else {
    for (let i = 0; i < l; i++) {
      includePointOffset(a, points[i]);
    }
  }

  return a;
}

function fromPointsInline(a, points) {
  const isTypedArray = !Array.isArray(points);
  if (isTypedArray) {
    for (let i = 0; i < points.length; i += 3) {
      a[0][0] = Math.min(a[0][0], points[i + 0]);
      a[0][1] = Math.min(a[0][1], points[i + 1]);
      a[0][2] = Math.min(a[0][2], points[i + 2]);
      a[1][0] = Math.max(a[1][0], points[i + 0]);
      a[1][1] = Math.max(a[1][1], points[i + 1]);
      a[1][2] = Math.max(a[1][2], points[i + 2]);
    }
  } else {
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      a[0][0] = Math.min(a[0][0], p[0]);
      a[0][1] = Math.min(a[0][1], p[1]);
      a[0][2] = Math.min(a[0][2], p[2]);
      a[1][0] = Math.max(a[1][0], p[0]);
      a[1][1] = Math.max(a[1][1], p[1]);
      a[1][2] = Math.max(a[1][2], p[2]);
    }
  }
  return a;
}

// Bench
describe("aabb.fromPoints() compare with array of vec3", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, NORM_POINTS));
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, NORM_POINTS));
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, NORM_POINTS));
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, NORM_POINTS));
  });
  it("aabb.fromPoints() using slicing for array with offset", () => {
    const a = aabb.create();
    run(() => fromPointsSlice(a, NORM_POINTS));
  });
});

describe("aabb.fromPoints() compare with Uint16Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, NORM_POINTS_U16));
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, NORM_POINTS_U16));
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, NORM_POINTS_U16));
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, NORM_POINTS_U16));
  });
  it("aabb.fromPoints() using slicing for array with offset", () => {
    const a = aabb.create();
    run(() => fromPointsSlice(a, NORM_POINTS_U16));
  });
});
describe("aabb.fromPoints() compare with Float32Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, NORM_POINTS_F32));
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, NORM_POINTS_F32));
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, NORM_POINTS_F32));
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, NORM_POINTS_F32));
  });
  it("aabb.fromPoints() using slicing for array with offset", () => {
    const a = aabb.create();
    run(() => fromPointsSlice(a, NORM_POINTS_F32));
  });
});
describe("aabb.fromPoints() compare with 1k length Float32Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, RANDOM_1K_LENGTH_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, RANDOM_1K_LENGTH_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, RANDOM_1K_LENGTH_F32), 100);
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, RANDOM_1K_LENGTH_F32), 100);
  });
});
describe("aabb.fromPoints() compare with 1k points Float32Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, RANDOM_1K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, RANDOM_1K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, RANDOM_1K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, RANDOM_1K_POINTS_F32), 100);
  });
});
describe("aabb.fromPoints() compare with 10k points Float32Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, RANDOM_10K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, RANDOM_10K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, RANDOM_10K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, RANDOM_10K_POINTS_F32), 100);
  });
});
describe("aabb.fromPoints() compare with 100k points Float32Array", () => {
  it("aabb.fromPoints() using includePoint with offset", () => {
    const a = aabb.create();
    run(() => fromPointsOffset(a, RANDOM_100K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset and precomputed for loop length", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetPrecomputeLength(a, RANDOM_100K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using includePoint with offset, precomputed for loop length and two loops", () => {
    const a = aabb.create();
    run(() => fromPointsOffsetIfCheckOutside(a, RANDOM_100K_POINTS_F32), 100);
  });
  it("aabb.fromPoints() using inline", () => {
    const a = aabb.create();
    run(() => fromPointsInline(a, RANDOM_100K_POINTS_F32), 100);
  });
});
