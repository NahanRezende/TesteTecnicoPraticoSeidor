import 'express-async-errors';
import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { writeApplicationLogError } from '../../utils/writeApplicationLogError';
import AppError from '../../errors/AppError';
import { router } from './routes/index';

const app = express();

app.use(express.json({ limit: '50mb' }) as RequestHandler);

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    writeApplicationLogError(err.message, err.statusCode, err.module);

    return response
      .status(err.statusCode)
      .json({ message: err.message, status: err.statusCode });
  }

  writeApplicationLogError(JSON.stringify(err), 500, 'default');

  console.log(err);

  return response
    .status(500)
    .json({ message: 'Internal server error', status: 500 });
});

export { app };
