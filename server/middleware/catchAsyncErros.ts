import { NextFunction, Request, Response } from "express";

export default function CatchAsyncError(fn: any) {
  return function (req: Request, res: Response, next: NextFunction) {
    fn(req, res, next).catch(next);
  };
}
