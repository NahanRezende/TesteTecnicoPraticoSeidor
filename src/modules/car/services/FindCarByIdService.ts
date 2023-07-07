import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()
export class FindCarByIdService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

 async execute(car_id: string): Promise<Car>{
  return this.carRepository.findCarById(car_id)
 }
}
