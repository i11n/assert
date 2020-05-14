import { Constructor, IErrorSpec } from "./types.ts";
import { _checkErrors } from "./private/_checkErrors.ts";
import { AssertionError } from "./AssertionError.ts";

export function assertThrows(fn: () => void, msgContains?: string, msg?: string): void
export function assertThrows(fn: () => void, errorClass?: Constructor, msg?: string): void
export function assertThrows(fn: () => void, errorSpec?: IErrorSpec, msg?: string): void
export function assertThrows(fn: () => void, errDef?: any, msg?: string): void {
  let throws = false;
  let throwMessage: string;

  try {
    fn();
  } catch (e) {
    throws = true;
    
    _checkErrors(e, errDef, msg);
  }

  if (!throws) {
    throwMessage = "Expected function to throw an error.";
    throwMessage += !msg ? "" : ` ${msg}`;

    throw new AssertionError(throwMessage);
  }
}