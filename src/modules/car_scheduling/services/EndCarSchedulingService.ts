import { inject, injectable } from "tsyringe";
import { CarScheduling } from "../infra/typeorm/entities/CarScheduling";
import { ICarSchedulingRepository } from "../repositories/ICarSchedulingRepository";
import AppError from "@shared/errors/AppError";

@injectable()
export class EndCarSchedulingService {
  constructor(
    @inject('CarSchedulingRepository')
    private carSchedulingRepository: ICarSchedulingRepository,
  ) {}

  async execute(driver_id: string): Promise<CarScheduling>{
    const carScheduling = await this.carSchedulingRepository.findByDriverId(driver_id);

    let carSchedulingToUpdate: CarScheduling;

    if(carScheduling.length >= 0){
      carSchedulingToUpdate = carScheduling.find(carScheduling => carScheduling.end_date_of_use === undefined);

      if(!carSchedulingToUpdate){
        throw new AppError('There is no Car Schedule to end!', undefined, 'end_car_scheduling');
      }
    }

    carSchedulingToUpdate.end_date_of_use = new Date();

    return this.carSchedulingRepository.update(carSchedulingToUpdate);
  }
}
