import { ICreateCarSchedulingDTO } from "../dtos/ICreateCarSchedulingDTO";
import { CarScheduling } from "../infra/typeorm/entities/CarScheduling";

export interface ICarSchedulingRepository {
  create(car_scheduling: ICreateCarSchedulingDTO): Promise<CarScheduling>;
  update(car_scheduling: CarScheduling): Promise<CarScheduling>;
  findAll(): Promise<CarScheduling[]>;
  findByDriverId(driver_id: string): Promise<CarScheduling[]>;
  findByCarId(car_id: string): Promise<CarScheduling[]>;
}
