import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()
export class FindCarsByColorService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

 async execute(color: string): Promise<Car[]>{
  return this.carRepository.findCarsByColor(color)
 }
}
