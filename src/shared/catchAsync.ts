import { NextFunction, Request, RequestHandler, Response } from 'express'
// catchAsync হলো একটি হায়ার অর্ডার ফাংশন, যেটি একটি async RequestHandler নেয় এবং একটি নতুন async ফাংশন রিটার্ন করে
const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }

export default catchAsync
