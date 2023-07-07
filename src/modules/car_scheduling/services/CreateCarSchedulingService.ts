import { inject, injectable } from 'tsyringe';
import { ICarSchedulingRepository } from '../repositories/ICarSchedulingRepository';
import { ICreateCarSchedulingDTO } from '../dtos/ICreateCarSchedulingDTO';
import { CarScheduling } from '../infra/typeorm/entities/CarScheduling';
import AppError from '@shared/errors/AppError';

@injectable()
export class CreateCarSchedulingService {
  constructor(
    @inject('CarSchedulingRepository')
    private carSchedulingRepository: ICarSchedulingRepository,
  ) {}

  async execute(car_scheduling: ICreateCarSchedulingDTO): Promise<CarScheduling>{
    const foundCarSchedulingByDriver = await this.carSchedulingRepository.findByDriverId(car_scheduling.driver_id);

    if(foundCarSchedulingByDriver.length > 0){
      const carScheduling = foundCarSchedulingByDriver.find(carScheduling => carScheduling.end_date_of_use === undefined);

      if(carScheduling){
        throw new AppError('Unable to create a car schedule, to many cars to one driver!', undefined, 'create_car_scheduling_service');
      }
    }

    const foundCarSchedulingByCar = await this.carSchedulingRepository.findByCarId(car_scheduling.car_id);

    if(foundCarSchedulingByCar.length > 0){
      const carScheduling = foundCarSchedulingByCar.find(carScheduling => carScheduling.end_date_of_use === undefined);

      if(!carScheduling.end_date_of_use){
        throw new AppError('Unable to create a car schedule, to many drivers to one car!', undefined, 'create_car_scheduling_service');
      }
    }

    return this.carSchedulingRepository.create(car_scheduling);
  }
}
