import { inject, injectable } from 'tsyringe';
import { IDriverRepository } from '../repositories/IDriverRepository';

@injectable()
export class DeleteDriverService {
  constructor(
    @inject('DriverRepository')
    private driverRepository: IDriverRepository,
  ) {}

  async execute(driver_id: string): Promise<void>{
    await this.driverRepository.delete(driver_id);
  }

}
