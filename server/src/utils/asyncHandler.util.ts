import type { Request, Response, NextFunction } from "express";

export async function asyncHandler(
  func: (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => Promise<void>,
) {
  return (request: Request, response: Response, next: NextFunction) => {
    func(request, response, next).catch(next);
  };
}
