import test from "tape";
import { ray } from "../index.js";

const allMethods = Object.keys(ray);
const handledMethods = [];

test("ray.create", (t) => {
  t.deepEqual(
    ray.create(),
    [
      [0, 0, 0],
      [0, 0, 1],
    ],
    "should create a new ray"
  );
  handledMethods.push("create");
  t.end();
});

test("coverage", (t) => {
  allMethods.forEach((name) => {
    if (!handledMethods.includes(name)) {
      console.log(`missing test for ray.${name}`);
    }
  });
  t.end();
});
