export const HttpError = class HttpError extends Error {
  static messages: Record<string, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable Entity",
    429: "Too Many Requests",
    500: "Internal Server Error",
    503: "Service Unavailable",
  };

  public name: string = "HttpError";
  public statusCode: number;

  constructor(statusCode: number) {
    super(HttpError.messages[statusCode] || "Unknown Error");

    this.statusCode = statusCode;
  }
};
