import { AssertionError } from "./AssertionError.ts";

export function assert(value: unknown, msg: string = "") {
  if (!value) {
    throw new AssertionError(msg);
  }
}