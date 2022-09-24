import { NextFunction } from 'express';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-req-error';
import { IErrWithCode } from '../types';

const handleRequestErrors = (err: IErrWithCode, next: NextFunction) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(new BadRequestError(err.message));
    // return;
  } else if (err.code === 11000) {
    next(new ConflictError('User with this email already exists'));
  } else {
    next(err);
  }
};

export default handleRequestErrors;
