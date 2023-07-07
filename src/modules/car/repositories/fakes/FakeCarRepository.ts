import { v4 as uuid } from 'uuid';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarRepository } from '../ICarRepository';

export class FakeCarRepository implements ICarRepository {
  private fakeCarRepository: Car[] = [];

  constructor(cars?: ICreateCarDTO[]) {
    this.fakeCarRepository = [];

    if (cars && cars.length > 0) {
      const carsToCreate: Car[] = cars.map(car => {
        return {
          id: uuid(),
          brand: car.brand,
          color: car.color,
          license_plate: car.license_plate,
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

      this.fakeCarRepository.push(...carsToCreate);
    }
  }

  async create(car: ICreateCarDTO): Promise<Car> {
    const carToCreate = new Car();

    Object.assign(carToCreate, {
      id: uuid(),
      brand: car.brand,
      color: car.color,
      license_plate: car.license_plate,
    });

    this.fakeCarRepository.push(carToCreate);

    return carToCreate;
  }

  async update(car: Car): Promise<Car> {
    const index = this.fakeCarRepository.findIndex(
      carToUpdate => carToUpdate.id === car.id,
    );

    this.fakeCarRepository[index].brand = car.brand;
    this.fakeCarRepository[index].color = car.color;
    this.fakeCarRepository[index].license_plate = car.license_plate;
    this.fakeCarRepository[index].updated_at = new Date();

    return this.fakeCarRepository[index];
  }

  async delete(car_id: string): Promise<void> {
    const index = this.fakeCarRepository.findIndex(
      carToUpdate => carToUpdate.id === car_id,
    );

    const [deletedCar] = this.fakeCarRepository.splice(index, 1);
  }

  async findCarById(car_id: string): Promise<Car> {
    const index = this.fakeCarRepository.findIndex(
      carToUpdate => carToUpdate.id === car_id,
    );

    return this.fakeCarRepository[index];
  }

  async findAll(): Promise<Car[]> {
    return this.fakeCarRepository;
  }

  async findCarsByColor(color: string): Promise<Car[]> {
    const cars: Car[] = [];

    this.fakeCarRepository.forEach(car => {
      if (car.color === color) {
        cars.push(car);
      }
    });

    return cars;
  }

  async findCarsByBrand(brand: string): Promise<Car[]> {
    const cars: Car[] = [];

    this.fakeCarRepository.forEach(car => {
      if (car.brand === brand) {
        cars.push(car);
      }
    });

    return cars;
  }
}
