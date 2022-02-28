import test from "tape";
import { plane } from "../index.js";

const allMethods = Object.keys(plane);
const handledMethods = [];

test("plane.create", (t) => {
  t.deepEqual(
    plane.create(),
    [
      [0, 0, 0],
      [0, 1, 0],
    ],
    "should create a new plane"
  );
  handledMethods.push("create");
  t.end();
});

test("coverage", (t) => {
  allMethods.forEach((name) => {
    if (!handledMethods.includes(name)) {
      console.log(`missing test for plane.${name}`);
    }
  });
  t.end();
});
