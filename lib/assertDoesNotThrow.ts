import { Constructor, IErrorSpec } from "./types.ts";
import { _checkErrors } from "./private/_checkErrors.ts";

export function assertDoesNotThrow(
  fn: () => void,
  msgContains?: string,
  msg?: string,
): void;
export function assertDoesNotThrow(
  fn: () => void,
  errorClass?: Constructor,
  msg?: string,
): void;
export function assertDoesNotThrow(
  fn: () => void,
  errorSpec?: IErrorSpec,
  msg?: string,
): void;
export function assertDoesNotThrow(
  fn: () => void,
  errDef?: any,
  msg?: string,
): void {
  try {
    fn();
  } catch (e) {
    _checkErrors(e, errDef, msg, true);
  }
}
