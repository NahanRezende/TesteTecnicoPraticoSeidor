import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';
import { Driver } from '../infra/typeorm/entities/Driver';

@injectable()
export class FindDriverByIdService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(driver_id: string): Promise<Driver>{
    return this.driverRepository.findDriverById(driver_id);
  }
}
