import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { container } from 'tsyringe';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { CarSchedulingRepository } from '@modules/car_scheduling/infra/typeorm/repositories/CarSchedulingRepository';

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<IDriverRepository>('DriverRepository', DriverRepository);

container.registerSingleton<ICarSchedulingRepository>('CarSchedulingRepository', CarSchedulingRepository);
