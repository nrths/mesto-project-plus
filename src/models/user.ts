import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Минимальное количество символов 2.'],
    maxLength: [30, 'Максимальное количество символов 30.'],
    // default: 'Jacques-Yves Cousteau',
  },
  about: {
    type: String,
    required: true,
    minLength: [2, 'Минимальное количество символов 2.'],
    maxLength: [200, 'Максимальное количество символов 200.'],
    // default: 'Ocean researcher'
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
