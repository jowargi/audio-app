export class APIError extends Error {
  public name: string = "APIError";

  constructor(message: string) {
    super(message);
  }
}
