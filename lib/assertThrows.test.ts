import { assertThrows } from "./assertThrows.ts";
import { AssertionError } from "./AssertionError.ts";

Deno.test("assertThrows - fn => throws", () => {
  assertThrows(() => {
    throw new Error();
  }, Error);
});

Deno.test("assertThrows - fn => okay", () => {
  assertThrows(() => {
    assertThrows(() => {/* Nothing thrown */});
  }, {ctor: AssertionError, message: 'Expected function to throw an error.'});
  
  assertThrows(() => {
    assertThrows(() => {/* Nothing thrown */}, undefined, 'This is the end.');
  }, {ctor: AssertionError, message: 'Expected function to throw an error. This is the end.'});
});