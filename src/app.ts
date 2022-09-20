import express, { Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import serverErrorHandler from './handlers/server-err-handler';
import router from './routes';
import { ISessionReq } from './types';

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: ISessionReq, res: Response, next: NextFunction) => {
  req.user = { _id: '632893c32c35d10d18fddf99' };
  next();
});

app.use(router);

app.use(serverErrorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is run on ${PORT} port`);
});
