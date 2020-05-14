/**
 * The error thrown when assertions are incorrect.
 */
export class AssertionError extends Error {
  /**
   * Creates an AssertionError.
   * 
   * @param message string The error message.
   */
  constructor(message: string) {
    super(message);

    this.name = "AssertionError";
  }
}
