import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import handleRequestErrors from '../handlers/requests-err-handler';
import { ISessionReq } from '../types';
// import { Types } from 'mongoose';

const { Types } = require('mongoose');

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

export const createCard = (req: ISessionReq, res: Response, next: NextFunction) => {
  const id = req.user?._id;
  Card.create({ ...req.body, owner: id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleRequestErrors(err, next));
};

export const deleteCard = (req: ISessionReq, res: Response, next: NextFunction) => {
  const userID = req.user?._id;
  const cardID = req.params.id;

  Card.findById(cardID)
    .then(async (card) => {
      if (!card) throw new NotFoundError('Card is not found');
      if (card.owner.toString() !== userID) throw new ForbiddenError('You are not allowed to delete others cards');
      await Card.findByIdAndRemove(cardID).populate('owner');
      return res.status(200).send({ message: 'Card deleted successfully' });
    })
    .catch((err) => handleRequestErrors(err, next));
};

export const addLike = (req: ISessionReq, res: Response, next: NextFunction) => {
  const userID = req?.user?._id;

  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: Types.ObjectId(userID) } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Card is not found'))
    .then((card) => { res.send({ data: card }); })
    .catch((err) => handleRequestErrors(err, next));
};

export const removeLike = (req: ISessionReq, res: Response, next: NextFunction) => {
  const userID = req?.user?._id;

  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: Types.ObjectId(userID) } },
    { new: true },
  )
    .orFail(new NotFoundError('Card is not found'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleRequestErrors(err, next));
};
