import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()
export class FindAllCarsService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(): Promise<Car[]>{
    return this.carRepository.findAll();
  }
}
