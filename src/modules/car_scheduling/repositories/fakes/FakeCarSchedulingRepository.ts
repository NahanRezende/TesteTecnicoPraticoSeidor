import { v4 as uuid } from 'uuid';
import { CarScheduling } from '../../infra/typeorm/entities/CarScheduling';
import { ICarSchedulingRepository } from '../ICarSchedulingRepository';
import { ICreateCarSchedulingDTO } from '@modules/car_scheduling/dtos/ICreateCarSchedulingDTO';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

export class FakeCarSchedulingRepository implements ICarSchedulingRepository {
  private fakeCarSchedulingRepository: CarScheduling[] = [];

  constructor(car_scheduling?: ICreateCarSchedulingDTO[]) {
    this.fakeCarSchedulingRepository = [];

    if (car_scheduling && car_scheduling.length > 0) {
      const carSchedulingToCreate: CarScheduling[] = car_scheduling.map(carScheduling => {
        return {
          id: uuid(),
          created_at: new Date(),
          updated_at: new Date(),
          end_date_of_use: carScheduling.end_date_of_use,
          reason_for_use: carScheduling.reason_for_use,
          start_date_of_use: new Date(),
          car_id: carScheduling.car_id,
          driver_id: carScheduling.driver_id,
          car: new Car(),
          driver: new Driver(),
        }
      });

      this.fakeCarSchedulingRepository.push(...carSchedulingToCreate);
    }
  }



  async create(car_scheduling: ICreateCarSchedulingDTO): Promise<CarScheduling> {
    const carSchedulingToCreate = new CarScheduling();

    Object.assign( carSchedulingToCreate,{
      id: uuid(),
      end_date_of_use: car_scheduling.end_date_of_use,
      reason_for_use: car_scheduling.reason_for_use,
      car_id: car_scheduling.car_id,
      driver_id: car_scheduling.driver_id,
    });

    this.fakeCarSchedulingRepository.push(carSchedulingToCreate);

    return carSchedulingToCreate;
  }

  async update(car_scheduling: CarScheduling): Promise<CarScheduling> {
    const index = this.fakeCarSchedulingRepository.findIndex(
      carScheduling => carScheduling.id === car_scheduling.id,
    );

    this.fakeCarSchedulingRepository[index].id = car_scheduling.id;
    this.fakeCarSchedulingRepository[index].reason_for_use = car_scheduling.reason_for_use;
    this.fakeCarSchedulingRepository[index].start_date_of_use = car_scheduling.start_date_of_use;
    this.fakeCarSchedulingRepository[index].end_date_of_use = car_scheduling.end_date_of_use;
    this.fakeCarSchedulingRepository[index].driver_id = car_scheduling.driver_id;
    this.fakeCarSchedulingRepository[index].car_id = car_scheduling.car_id;

    return this.fakeCarSchedulingRepository[index];
  }

  async findAll(): Promise<CarScheduling[]> {
    return this.fakeCarSchedulingRepository;
  }

  async findByDriverId(driver_id: string): Promise<CarScheduling[]> {
    return this.fakeCarSchedulingRepository.filter(carScheduling => carScheduling.driver_id === driver_id);
  }

  async findByCarId(car_id: string): Promise<CarScheduling[]> {
    return this.fakeCarSchedulingRepository.filter(carScheduling => carScheduling.car_id === car_id);
  }
}
