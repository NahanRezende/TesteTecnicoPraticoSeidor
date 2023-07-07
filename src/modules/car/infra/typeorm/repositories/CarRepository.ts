import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { Repository } from 'typeorm';
import { dataSource } from '@shared/infra/typeorm';
import { ICreateCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { Car } from '../entities/Car';

export class CarRepository implements ICarRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Car);
  }

  async create(car: ICreateCarDTO): Promise<Car> {
    const createdCar = this.ormRepository.create(car);

    return this.ormRepository.save(createdCar);
  }

  async update(car: Car): Promise<Car> {
    return this.ormRepository.save(car);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findCarById(car_id: string): Promise<Car> {
    return this.ormRepository.findOne({ where: { id: car_id } });
  }

  async findAll(): Promise<Car[]> {
    return this.ormRepository.find();
  }

  async findCarsByColor(color: string): Promise<Car[]> {
    return this.ormRepository.find({ where: { color } });
  }

  async findCarsByBrand(brand: string): Promise<Car[]> {
    return this.ormRepository.find({ where: { brand } });
  }
}
