import { Request, Response, NextFunction } from 'express';
import Card from '../models/card';
import NotFoundError from '../errors/not-found-error';
import ForbiddenError from '../errors/forbidden-error';
import handleRequestErrors from '../handlers/requests-err-handler';
import { SessionRequest, UserSession } from '../types';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;

  Card.create({ ...request.body, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => handleRequestErrors(err, next));
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;
  const { id } = request.params;

  Card.findById(id)
    .then((card) => {
      if (!card) throw new NotFoundError('Card is not found');
      if (card.owner.valueOf() === _id) {
        Card.findByIdAndRemove(id)
          .populate('owner')
          .then((deletedCard) => {
            res.send({ data: deletedCard, message: 'Card deleted successfully' });
          })
          .catch((err) => handleRequestErrors(err, next));
      } else {
        throw new ForbiddenError('You are not allowed to delete others cards');
      }
    })
    .catch((err) => handleRequestErrors(err, next));
};

export const addLike = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;
  const { id } = request.params;

  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Card is not found'))
    .then((card) => { res.send({ data: card }); })
    .catch((err) => handleRequestErrors(err, next));
};

export const removeLike = (req: Request, res: Response, next: NextFunction) => {
  const request = req as SessionRequest;
  const { _id } = request.user as UserSession;
  const { id } = request.params;

  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: _id } },
    { new: true },
  )
    .orFail(new NotFoundError('Card is not found'))
    .then((card) => res.send({ data: card }))
    .catch((err) => handleRequestErrors(err, next));
};
