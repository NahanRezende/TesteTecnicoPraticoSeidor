import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()
export class CreateCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(car: ICreateCarDTO): Promise<Car>{
    return this.carRepository.create(car);
  }
}
