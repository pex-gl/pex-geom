import test from "tape";
import { aabb } from "../index.js";

const allMethods = Object.keys(aabb);
const handledMethods = [];

test("aabb.create", (t) => {
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  t.deepEqual(aabb.create(), [min, max], "should create a new abb");
  handledMethods.push("create");
  t.end();
});

test("coverage", (t) => {
  allMethods.forEach((name) => {
    if (!handledMethods.includes(name)) {
      console.log(`missing test for aabb.${name}`);
    }
  });
  t.end();
});
