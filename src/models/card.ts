import { ICard } from '../types';
import { Schema, model } from 'mongoose';

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
      default: []
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

export default model<ICard>('card', cardSchema);