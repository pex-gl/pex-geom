import test from "tape";
import { rect } from "../index.js";

const allMethods = Object.keys(rect);
const handledMethods = [];

test("rect.create", (t) => {
  const newRect = [
    [Infinity, Infinity],
    [-Infinity, -Infinity],
  ];
  t.deepEqual(rect.create(), newRect, "should create a new rect");
  handledMethods.push("create");
  t.end();
});

test("coverage", (t) => {
  allMethods.forEach((name) => {
    if (!handledMethods.includes(name)) {
      console.log(`missing test for rect.${name}`);
    }
  });
  t.end();
});
