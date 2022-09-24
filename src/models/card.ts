import { Schema, model } from 'mongoose';
import URL_REGEXP from '../utils/url-regexp';
import { ICard } from '../types';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    minLength: [2, 'Поле должно содержать от 2 до 20 символов'],
    maxLength: [20, 'Поле должно содержать от 2 до 20 символов'],
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => URL_REGEXP.test(value),
      message: 'Link is incorrect',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default model<ICard>('card', cardSchema);
