import { v4 as uuid } from 'uuid';
import { Driver } from '../../infra/typeorm/entities/Driver';
import { IDriverRepository } from '../IDriverRepository';

export class FakeDriverRepository implements IDriverRepository {
  private fakeDriverRepository: Driver[] = [];

  constructor(drivers?: string[]) {
    this.fakeDriverRepository = [];

    if (drivers && drivers.length > 0) {
      const driversToCreate: Driver[] = drivers.map(driver => {
        return {
          id: uuid(),
          name: driver,
          created_at: new Date(),
          updated_at: new Date(),
        };
      });

      this.fakeDriverRepository.push(...driversToCreate);
    }
  }

  async create(name: string): Promise<Driver> {
    const driverToCreate = new Driver();

    Object.assign(driverToCreate, {
      id: uuid(),
      name,
    });

    this.fakeDriverRepository.push(driverToCreate);

    return driverToCreate;
  }

  async update(driver: Driver): Promise<Driver> {
    const index = this.fakeDriverRepository.findIndex(
      driverToUpdate => driverToUpdate.id === driver.id,
    );

    this.fakeDriverRepository[index].name = driver.name;
    this.fakeDriverRepository[index].updated_at = new Date();

    return this.fakeDriverRepository[index];
  }

  async delete(driver_id: string): Promise<void> {
    const index = this.fakeDriverRepository.findIndex(
      driverToDelete => driverToDelete.id === driver_id,
    );

    this.fakeDriverRepository.splice(index, 1);
  }

  async findDriverById(driver_id: string): Promise<Driver> {
    const index = this.fakeDriverRepository.findIndex(
      driver => driver.id === driver_id,
    );

    return this.fakeDriverRepository[index];
  }

  async findAll(): Promise<Driver[]> {
    return this.fakeDriverRepository;
  }

  async findDriverByName(name: string): Promise<Driver> {
    const index = this.fakeDriverRepository.findIndex(
      driver => driver.name === name,
    );

    return this.fakeDriverRepository[index];
  }
}
