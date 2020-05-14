import { assertDoesNotThrow } from "./assertDoesNotThrow.ts";

class ExampleError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = "ExampleError";
  }
}

Deno.test("assertDoesNotThrow(fn) - fn okay", () => {
  assertDoesNotThrow(() => {
  });
});

Deno.test("assertDoesNotThrow(fn, ctor) - fn okay", () => {
  assertDoesNotThrow(() => {
    throw new Error();
  }, ExampleError);
});

Deno.test("assertDoesNotThrow(fn, message) - fn throws", () => {
  assertDoesNotThrow(() => {
    throw new Error("This has really happened (JK00101010).");
  }, "Luckdragon");
});

Deno.test("assertDoesNotThrow(fn, spec) - fn throws", () => {
  assertDoesNotThrow(() => {
    throw new Error("This has really happened (JK00101010).");
  }, { ctor: ExampleError, message: "Luckdragon" });
});

// Deno.test("assertThrows(fn) - fn okay", () => {
//   assertThrows(() => {
//     assertThrows(() => {/* No Error Thrown */})
//   }, {ctor: AssertionError, message: "Expected function to throw an error."});
// });

// Deno.test("assertThrows(fn, ctor) - bad ctor", () => {
//   assertThrows(() => {
//     assertThrows(() => {
//       throw new Error();
//     }, ExampleError);
//   }, 'Expected error to be an instance of "ExampleError", instead was "Error."')
// });

// Deno.test("assertThrows(fn, message) - bad message", () => {
//   assertThrows(() => {
//     assertThrows(() => {
//       throw new Error("This is an error");
//     }, "All is okay");
//   }, 'Expected error message to contain "All is okay", instead was "This is an error".')
// });
