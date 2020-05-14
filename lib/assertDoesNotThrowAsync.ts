import { Constructor, IErrorSpec } from "./types.ts";
import { _checkErrors } from "./private/_checkErrors.ts";
import { AssertionError } from "./AssertionError.ts";

export async function assertThrowAsync(
  fn: () => Promise<void>,
  msgContains?: string,
  msg?: string,
): Promise<void>;
export async function assertThrowAsync(
  fn: () => Promise<void>,
  errorClass?: Constructor,
  msg?: string,
): Promise<void>;
export async function assertThrowAsync(
  fn: () => Promise<void>,
  errorSpec?: IErrorSpec,
  msg?: string,
): Promise<void>;
export async function assertThrowAsync(
  fn: () => Promise<void>,
  errDef?: any,
  msg?: string,
): Promise<void> {
  try {
    await fn();
  } catch (e) {
    _checkErrors(e, errDef, msg, true);
  }
}
