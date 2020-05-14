import { Constructor, IErrorSpec } from "./types.ts";
import { _checkErrors } from "./private/_checkErrors.ts";
import { AssertionError } from "./AssertionError.ts";

export async function assertThrowsAsync(fn: () => Promise<void>, msgContains?: string, msg?: string): Promise<void>
export async function assertThrowsAsync(fn: () => Promise<void>, errorClass?: Constructor, msg?: string): Promise<void>
export async function assertThrowsAsync(fn: () => Promise<void>, errorSpec?: IErrorSpec, msg?: string): Promise<void>
export async function assertThrowsAsync(fn: () => Promise<void>, errDef?: any, msg?: string): Promise<void> {
  let throws = false;
  let throwMessage: string;

  try {
    await fn();
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