import { celebrate, Joi } from 'celebrate';
import URL_REGEXP from '../utils/url-regexp';
import validateId from './object-id';

export const validateGetUserByIdRequest = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateId),
  }),
});

export const validateUpdateUserRequest = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30), // required?
      about: Joi.string().min(2).max(200), // required?
    })
    .unknown(true),
});

export const validateUpdateAvatarRequest = celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string().uri().pattern(URL_REGEXP),
    })
    .unknown(true),
});
