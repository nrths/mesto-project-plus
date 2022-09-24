import { Request, Response } from 'express';
import { IErrWithCode } from '../types';

const serverErrorHandler = (
  err: IErrWithCode,
  req: Request,
  res: Response,
) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};

export default serverErrorHandler;
