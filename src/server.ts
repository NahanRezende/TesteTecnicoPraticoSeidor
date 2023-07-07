import { config } from 'dotenv';
import 'reflect-metadata';
import 'dotenv/config';
import '@shared/infra/http/container';
import { app } from './shared/infra/http/app';
import { dataSource } from './shared/infra/typeorm/index';

config();

dataSource.initialize().then(() => {
  app.listen(3333, () => console.log('Server started on port 3333.'));
});
