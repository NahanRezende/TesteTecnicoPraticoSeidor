import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';
import { Driver } from '../infra/typeorm/entities/Driver';

@injectable()
export class UpdateDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(driver: Driver): Promise<Driver>{
    return this.driverRepository.update(driver);
  }
}
