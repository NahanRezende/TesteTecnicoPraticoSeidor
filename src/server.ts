import { config } from 'dotenv';
import 'reflect-metadata';
import 'dotenv/config';
import { app } from './shared/infra/http/app';
import { dataSource } from './shared/infra/typeorm/index';

config();

dataSource.initialize().then(() => {
  app.listen(7003, () => console.log('Server started on port 7003.'));
});
