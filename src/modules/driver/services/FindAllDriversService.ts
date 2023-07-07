import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';
import { Driver } from '../infra/typeorm/entities/Driver';

@injectable()
export class FindAllDriversService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(): Promise<Driver[]>{
    return this.driverRepository.findAll();
  }
}
