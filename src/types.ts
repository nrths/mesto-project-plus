import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Schema, ObjectId } from 'mongoose';

export interface SessionRequest extends Request {
  user?: string | JwtPayload;
}

export interface UserSession {
  _id: Schema.Types.ObjectId;
}

export interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export interface ICard {
  name: string,
  link: string,
  owner: ObjectId,
  likes: ObjectId[],
  createdAt: Date,
}

export interface IErrWithCode extends Error {
  statusCode?: number;
  code?: number;
}
