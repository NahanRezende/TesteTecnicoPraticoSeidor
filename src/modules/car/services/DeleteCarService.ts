import { inject, injectable } from 'tsyringe';
import { ICarRepository } from '../repositories/ICarRepository';

@injectable()

export class DeleteCarService {
  constructor(
    @inject('CarRepository')
    private carRepository: ICarRepository,
  ) {}

  async execute(car_id: string): Promise<void>{
    await this.carRepository.delete(car_id);
  }
}
