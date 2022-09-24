import { celebrate, Joi } from 'celebrate';
import URL_REGEXP from '../utils/url-regexp';

const validateLoginReq = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  })
    .unknown(true),
});

const validateRegisterReq = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri().pattern(URL_REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
    .unknown(true),
});

export { validateRegisterReq, validateLoginReq };
