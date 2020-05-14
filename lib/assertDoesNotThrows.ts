import { Constructor, IErrorSpec } from "./types.ts";
import { _checkErrors } from "./private/_checkErrors.ts";
import { AssertionError } from "./AssertionError.ts";

export function assertThrows(fn: () => void, msgContains?: string, msg?: string): void
export function assertThrows(fn: () => void, errorClass?: Constructor, msg?: string): void
export function assertThrows(fn: () => void, errorSpec?: IErrorSpec, msg?: string): void
export function assertThrows(fn: () => void, errDef?: any, msg?: string): void {
  try {
    fn();
  } catch (e) {
    _checkErrors(e, errDef, msg, true);
  }
}