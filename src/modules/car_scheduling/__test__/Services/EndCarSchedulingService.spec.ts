import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { ICreateCarSchedulingDTO } from '@modules/car_scheduling/dtos/ICreateCarSchedulingDTO';
import { FakeCarSchedulingRepository } from '@modules/car_scheduling/repositories/fakes/FakeCarSchedulingRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { EndCarSchedulingService } from '@modules/car_scheduling/services/EndCarSchedulingService';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import AppError from '@shared/errors/AppError';

describe('End car scheduling service test', () => {
  let fakeCarRepository: ICarRepository;
  let fakeCarSchedulinRepository: ICarSchedulingRepository;
  let fakeDriverRepository: IDriverRepository;

  let endCarSchedulingService: EndCarSchedulingService;


  beforeAll(() => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();

    endCarSchedulingService = new EndCarSchedulingService(fakeCarSchedulinRepository);
  });

  afterEach(async () => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();

    endCarSchedulingService = new EndCarSchedulingService(fakeCarSchedulinRepository);
  });

  it('Should not be able to end a car scheduling to a driver who does not have a scheduling', async () => {
    try {
      const driver = await fakeDriverRepository.create('teste1');

      const car = await fakeCarRepository.create({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

      const carScheduling = {
        end_date_of_use: new Date(),
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver.id,
      };

      const createdCarScheduling = await fakeCarSchedulinRepository.create(carScheduling);

      await endCarSchedulingService.execute(createdCarScheduling.driver_id);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);

      expect(error.message).toEqual('There is no Car Schedule to end!');
      expect(error.statusCode).toEqual(400);
      expect(error.module).toEqual('end_car_scheduling');
    }
  });

  it('Should be able to end a car scheduling', async () => {
    const driver = await fakeDriverRepository.create('teste1');

      const car = await fakeCarRepository.create({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

      const carScheduling = {
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver.id,
      };

      const createdCarScheduling = await fakeCarSchedulinRepository.create(carScheduling);

      const endedCarScheduling = await endCarSchedulingService.execute(createdCarScheduling.driver_id);

    expect(endedCarScheduling.id).toEqual(createdCarScheduling.id);
    expect(endedCarScheduling.car_id).toEqual(createdCarScheduling.car_id);
    expect(endedCarScheduling.driver_id).toEqual(createdCarScheduling.driver_id);
  });
});
