import { assert } from "./assert.ts";

export function fail(msg?: string) {
  assert(false, msg);
}
