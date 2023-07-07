import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';
import { Driver } from '../infra/typeorm/entities/Driver';

@injectable()
export class CreateDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(name: string): Promise<Driver>{
    return this.driverRepository.create(name);
  }
}
