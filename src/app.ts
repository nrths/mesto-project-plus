import express, { Response, NextFunction} from 'express';
import serverErrorHandler from './handlers/server-err-handler';
import mongoose from 'mongoose';
import router from './routes/index';
import { ISessionReq } from './types';

const { PORT = 3000 } = process.env

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: ISessionReq, res: Response, next: NextFunction) => {
  req.user = { _id: '632893c32c35d10d18fddf99' }
  next()
})

app.use(router);

app.use(serverErrorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server is run on ${PORT} port`)
});