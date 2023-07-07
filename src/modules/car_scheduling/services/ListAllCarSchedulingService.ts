import { inject, injectable } from "tsyringe";
import { ICarSchedulingRepository } from "../repositories/ICarSchedulingRepository";
import { ICarSchedulingDTO } from "../dtos/ICarSchedulingDTO";
import { IDriverRepository } from "@modules/driver/repositories/IDriverRepository";
import { ICarRepository } from "@modules/car/repositories/ICarRepository";

@injectable()
export class ListAllCarSchedulingService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
    @inject('CarSchedulingRepository')
    private carSchedulingRepository: ICarSchedulingRepository,
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(): Promise<ICarSchedulingDTO[]>{
    const carSchedulingArray = await this.carSchedulingRepository.findAll();

    const carSchedulingEnriched: ICarSchedulingDTO[] = [];

    for(const carScheduling of carSchedulingArray) {
      const driver = await this.driverRepository.findDriverById(carScheduling.driver_id);

      const car = await this.carRepository.findCarById(carScheduling.car_id);

      carSchedulingEnriched.push({
        id: carScheduling.id,
        car_brand: car.brand,
        car_color: car.color,
        car_license_plate: car.license_plate,
        created_at: carScheduling.created_at,
        updated_at: carScheduling.updated_at,
        driver_name: driver.name,
        end_date_of_use: carScheduling.end_date_of_use,
        reason_for_use: carScheduling.reason_for_use,
        start_date_of_use: carScheduling.start_date_of_use,
      });

    }


    return carSchedulingEnriched;
  }
}
