import express from 'express';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import serverErrorHandler from './handlers/server-err-handler';
import router from './routes';
import auth from './middlewares/auth';
import { validateRegisterReq, validateLoginReq } from './validators/auth';
import { login, register } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', validateRegisterReq, register);
app.post('/signin', validateLoginReq, login);

app.use(auth);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(serverErrorHandler);

app.listen(PORT);
