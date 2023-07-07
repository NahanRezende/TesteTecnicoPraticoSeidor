import { IDriverRepository } from "@modules/driver/repositories/IDriverRepository";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Driver } from "../entities/Driver";

export class DriverRepository implements IDriverRepository {
  private ormRepository: Repository<Driver>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Driver);
  }

  async create(name: string): Promise<Driver> {
    const driver = this.ormRepository.create({name});

    return this.ormRepository.save(driver);
  }

  async update(driver: Driver): Promise<Driver> {
    return this.ormRepository.save(driver)
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findAll(): Promise<Driver[]> {
    return this.ormRepository.find();
  }

  async findDriverById(driver_id: string): Promise<Driver> {
    return this.ormRepository.findOne({ where: { id: driver_id } })
  }

  async findDriverByName(name: string): Promise<Driver> {
    return this.ormRepository.findOne({ where: { name } })
  }

}
