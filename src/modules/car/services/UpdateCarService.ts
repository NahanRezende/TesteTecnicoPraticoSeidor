import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()

export class UpdateCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(car: Car): Promise<Car>{
    return this.carRepository.update(car);
  }
}
