import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SessionRequest } from '../types';
import UnauthorizedError from '../errors/unauthorized-error';

const extractBearerToken = (token: string) => token.replace('Bearer ', '');

export default (req: SessionRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer ')) {
    const token = extractBearerToken(authorization);
    let payload;
    try {
      payload = jwt.verify(token, 'super-secret-key');
    } catch (err) {
      throw new UnauthorizedError('Login required');
    }
    req.user = payload;
    next();
  } else {
    throw new UnauthorizedError('Login required');
  }
};
