import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import handleRequestErrors from '../handlers/requests-err-handler';
import { SessionRequest, UserSession } from '../types';

export const register = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleRequestErrors(err, next));
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtToken = jwt.sign({ _id: user._id }, 'super-secret-key', { expiresIn: '7d' });
      res.send({ token: jwtToken });
    })
    .catch((err) => handleRequestErrors(err, next));
};

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('User is not found');
      }
    })
    .catch((err) => handleRequestErrors(err, next));
};

export const getCurrentUser = (req: SessionRequest, res: Response, next: NextFunction) => {
  const { _id } = req.user as UserSession;

  User.findById(_id)
    .orFail(() => new NotFoundError('User is not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleRequestErrors(err, next));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;

  User.findByIdAndUpdate(_id, request.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('User is not found'))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleRequestErrors(err, next));
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;

  User.findByIdAndUpdate(_id, { avatar: request.body.avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('User is not found'))
    .then((user) => res.send(user))
    .catch((err) => handleRequestErrors(err, next));
};
