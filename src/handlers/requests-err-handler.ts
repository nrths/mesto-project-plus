import { NextFunction } from 'express';
import BadRequestError from '../errors/bad-req-error';
import { IErrWithCode } from '../types';

export const handleRequestErrors = (err: IErrWithCode, next: NextFunction) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
  }
  next(err);
}