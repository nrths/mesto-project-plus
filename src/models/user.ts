import {
  Schema, model, Model, Document,
} from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import URL_REGEXP from '../utils/url-regexp';
import { IUser } from '../types';
import UnauthorizedError from '../errors/unauthorized-error';

interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<unknown, any, IUser>>
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minLength: [2, 'Минимальное количество символов 2.'],
    maxLength: [30, 'Максимальное количество символов 30.'],
    default: 'Jacques-Yves Cousteau',
  },
  about: {
    type: String,
    minLength: [2, 'Минимальное количество символов 2.'],
    maxLength: [200, 'Максимальное количество символов 200.'],
    default: 'Ocean researcher',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value: string) => URL_REGEXP.test(value),
      message: 'Link is incorrect',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // index: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: 'Email is incorrect',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.index({ email: 1 }, { unique: true });
userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Email or password is invalid'));
      }
      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Email or password is invalid'));
          }
          return user;
        });
    });
});

const User = model<IUser, UserModel>('user', userSchema);

export default User;
