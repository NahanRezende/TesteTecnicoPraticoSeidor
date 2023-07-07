import { Driver } from "../infra/typeorm/entities/Driver";

export interface IDriverRepository {
  create(name: string): Promise<Driver>;
  update(driver: Driver): Promise<Driver>;
  delete(driver_id: string): Promise<void>;
  findAll(): Promise<Driver[]>;
  findDriverById(driver_id: string): Promise<Driver>;
  findDriverByName(name: string): Promise<Driver>
}
