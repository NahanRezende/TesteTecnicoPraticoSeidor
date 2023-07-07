import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  update(car: Car): Promise<Car>;
  delete(car_id: string): Promise<void>;
  findCarById(car_id: string): Promise<Car>;
  findAll(): Promise<Car[]>;
  findCarsByColor(color: string): Promise<Car[]>;
  findCarsByBrand(brand: string): Promise<Car[]>;
}
