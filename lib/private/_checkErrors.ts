import { Constructor, IErrorSpec } from "../types.ts";
import { AssertionError } from "../AssertionError.ts";

function _getErrorDef(errDef?: string | Constructor | IErrorSpec): IErrorSpec {
  if (!errDef) return {};
  if (typeof errDef === "string") return { message: errDef };
  if (typeof errDef === "function") return { ctor: errDef };
  return errDef;
}

export function _checkErrors(
  thrown: Error,
  msgContains?: string,
  msg?: string,
  negate?: boolean,
): void;
export function _checkErrors(
  thrown: Error,
  errorClass?: Constructor,
  msg?: string,
  negate?: boolean,
): void;
export function _checkErrors(
  thrown: Error,
  errorSpec?: IErrorSpec,
  msg?: string,
  negate?: boolean,
): void;
export function _checkErrors(
  thrown: Error,
  errDef?: any,
  msg?: string,
  negate: boolean = false,
): void {
  const { message, ctor } = _getErrorDef(errDef);

  let thrownType = thrown.constructor.name;
  let throwMessage: string;

  if (ctor) {
    if (!negate && Object.getPrototypeOf(thrown) !== ctor.prototype) {
      throwMessage =
        `Expected error to be an instance of "${ctor.name}", instead was "${thrownType}."`;
      throwMessage += !msg ? "" : ` ${msg}`;

      throw new AssertionError(throwMessage);
    } else if (negate && Object.getPrototypeOf(thrown) === ctor.prototype) {
      throwMessage = `Expected error not to be an instance of "${ctor.name}".`;
      throwMessage += !msg ? "" : ` ${msg}`;

      throw new AssertionError(throwMessage);
    }
  }

  if (message) {
    if (!negate && !thrown.message.includes(message)) {
      throwMessage =
        `Expected error message to contain "${message}", instead was "${thrown.message}".`;
      throwMessage += !msg ? "" : ` ${msg}`;

      throw new AssertionError(throwMessage);
    } else if (negate && thrown.message.includes(message)) {
      throwMessage =
        `Expected error message not to contain "${message}", instead was "${thrown.message}".`;
      throwMessage += !msg ? "" : ` ${msg}`;

      throw new AssertionError(throwMessage);
    }
  }

  if (negate && (!message && !ctor)) {
    throwMessage = `Expected function not to throw an error.`;
    throwMessage += !msg ? "" : ` ${msg}`;

    throw new AssertionError(throwMessage);
  }
}
