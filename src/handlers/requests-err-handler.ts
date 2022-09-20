import { NextFunction } from 'express';
import BadRequestError from '../errors/bad-req-error';
import { IErrWithCode } from '../types';

const handleRequestErrors = (err: IErrWithCode, next: NextFunction) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
    return;
  }
  next(err);
};

export default handleRequestErrors;
