import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import handleRequestErrors from '../handlers/requests-err-handler';
import { ISessionReq } from '../types';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) throw new NotFoundError('User is not found');
      res.status(200).send({ data: user });
    })
    .catch((err) => handleRequestErrors(err, next));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleRequestErrors(err, next));
};

export const updateUser = (req: ISessionReq, res: Response, next: NextFunction) => {
  const id = req.user?._id;

  User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('User is not found'))
    .then((user) => res.send(user))
    .catch((err) => handleRequestErrors(err, next));
};

export const updateAvatar = (req: ISessionReq, res: Response, next: NextFunction) => {
  const id = req.user?._id;

  User.findByIdAndUpdate(id, { avatar: req.body.avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError('User is not found'))
    .then((user) => res.send(user))
    .catch((err) => handleRequestErrors(err, next));
};
