import { celebrate, Joi } from 'celebrate';
import URL_REGEXP from '../utils/url-regexp';
import validateId from './object-id';

const validateCreateCardRequest = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri().pattern(URL_REGEXP),
    })
    .unknown(true),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateId),
  }),
});

export { validateCreateCardRequest, validateCardId };
