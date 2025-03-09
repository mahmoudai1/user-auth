import { Request, Response } from 'express';
import { responseHandler } from '../utils/response';


export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  return responseHandler(res, 500, 'Something went wrong', null, err);
};