import { assertThrows } from "./assertThrows.ts";
import { AssertionError } from "./AssertionError.ts";

class ExampleError extends Error {
  constructor(msg?: string) {
    super(msg);
    this.name = "ExampleError";
  }
}

Deno.test("assertThrows(fn) - fn throws", () => {
  assertThrows(() => {
    throw new Error();
  }, Error);
});

Deno.test("assertThrows(fn, ctor) - fn throws", () => {
  assertThrows(() => {
    throw new ExampleError();
  }, ExampleError);
});

Deno.test("assertThrows(fn, message) - fn throws", () => {
  assertThrows(() => {
    throw new Error("This has really happened (JK00101010).");
  }, "JK00101010");
});

Deno.test("assertThrows(fn, spec) - fn throws", () => {
  assertThrows(() => {
    throw new ExampleError("This has really happened (JK00101010).");
  }, { ctor: ExampleError, message: "JK00101010" });
});

Deno.test("assertThrows(fn) - fn okay", () => {
  assertThrows(() => {
    assertThrows(() => {/* No Error Thrown */});
  }, { ctor: AssertionError, message: "Expected function to throw an error." });
});

Deno.test("assertThrows(fn, ctor) - bad ctor", () => {
  assertThrows(
    () => {
      assertThrows(() => {
        throw new Error();
      }, ExampleError);
    },
    'Expected error to be an instance of "ExampleError", instead was "Error."',
  );
});

Deno.test("assertThrows(fn, message) - bad message", () => {
  assertThrows(
    () => {
      assertThrows(() => {
        throw new Error("This is an error");
      }, "All is okay");
    },
    'Expected error message to contain "All is okay", instead was "This is an error".',
  );
});
