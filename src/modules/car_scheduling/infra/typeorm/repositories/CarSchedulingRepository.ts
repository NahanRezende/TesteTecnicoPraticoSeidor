import { ICarSchedulingRepository } from "@modules/car_scheduling/repositories/ICarSchedulingRepository";
import { CarScheduling } from "../entities/CarScheduling";
import { dataSource } from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { ICreateCarSchedulingDTO } from "@modules/car_scheduling/dtos/ICreateCarSchedulingDTO";

export class CarSchedulingRepository implements ICarSchedulingRepository {
  private ormRepository: Repository<CarScheduling>;

  constructor() {
    this.ormRepository = dataSource.getRepository(CarScheduling);
  }

  async create(car_scheduling: ICreateCarSchedulingDTO): Promise<CarScheduling> {
    const carScheduling = this.ormRepository.create(car_scheduling);

    return this.ormRepository.save(carScheduling);
  }

  async update(car_scheduling: CarScheduling): Promise<CarScheduling> {
    return this.ormRepository.save(car_scheduling);
  }

  async findAll(): Promise<CarScheduling[]>{
    return this.ormRepository.find();
  }

  async findByDriverId(driver_id: string): Promise<CarScheduling[]>{
    const carScheduling = await this.ormRepository.find({ where: { driver_id: driver_id } });

    return carScheduling
  }

  async findByCarId(car_id: string): Promise<CarScheduling[]>{
    const carScheduling = await this.ormRepository.find({ where: { car_id: car_id } });

    return carScheduling
  }
}
