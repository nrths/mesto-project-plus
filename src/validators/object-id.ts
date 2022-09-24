import { isObjectIdOrHexString } from 'mongoose';
import BadRequestError from '../errors/bad-req-error';

const validateId = (value: string) => {
  if (!isObjectIdOrHexString(value)) {
    throw new BadRequestError('Incorrect ID');
  }
  return value;
};

export default validateId;
