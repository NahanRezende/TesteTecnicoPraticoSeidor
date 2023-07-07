import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';
import { Car } from '../infra/typeorm/entities/Car';

@injectable()
export class FindCarsByBrandService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

 async execute(brand: string): Promise<Car[]>{
  return this.carRepository.findCarsByBrand(brand);
 }
}
