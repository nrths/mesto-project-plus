import { Request, Response, NextFunction } from 'express';
import { IErrWithCode } from '../types';

const serverErrorHandler = (err: IErrWithCode, req: Request, res: Response, next: NextFunction) => {
  const { code = 500, message } = err;

  res.status(code).send({ message: code === 500 ? 'На сервере произошла ошибка' : message })
}

export default serverErrorHandler;