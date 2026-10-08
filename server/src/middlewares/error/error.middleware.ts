import type { NextFunction, Request, response, Response } from "express";
import { fail } from "../../utils/envelope.util.js";
import { AppError } from "../../utils/appError.util.js";

export function notFound(request: Request, response: Response) {
  response.status(404).json(fail(`Route not found ${request.method}`));
}

export function errorHandler(
  error: unknown,
  _request: Request,
  _response: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return _response
      .status(error.statusCode)
      .json(fail(error.message, `APP_ERROR`));
  }

  console.error("error", error);

  return _response.json(500).json(fail("Internal Server Error", `INTERNAL`));
}
