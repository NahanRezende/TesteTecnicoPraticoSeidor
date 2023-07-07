import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { ICreateCarSchedulingDTO } from '@modules/car_scheduling/dtos/ICreateCarSchedulingDTO';
import { FakeCarSchedulingRepository } from '@modules/car_scheduling/repositories/fakes/FakeCarSchedulingRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { CreateCarSchedulingService } from '@modules/car_scheduling/services/CreateCarSchedulingService';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import AppError from '@shared/errors/AppError';

describe('Create car scheduling service test', () => {
  let fakeCarRepository: ICarRepository;
  let fakeCarSchedulinRepository: ICarSchedulingRepository;
  let fakeDriverRepository: IDriverRepository;


  let createCarSchedulingService: CreateCarSchedulingService;

  beforeAll(() => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();

    createCarSchedulingService = new CreateCarSchedulingService(fakeCarSchedulinRepository);
  });

  afterEach(async () => {
    fakeCarRepository = new FakeCarRepository();
    fakeDriverRepository = new FakeDriverRepository();
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();

    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();
  });

  it('Should not be able to create a car scheduling to a driver who aready have a scheduling', async () => {
    try {
      const driver = await fakeDriverRepository.create('teste1');

      const car = await fakeCarRepository.create({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

      const carScheduling = {
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver.id,
      };

      await fakeCarSchedulinRepository.create(carScheduling);

      const carScheduling1: ICreateCarSchedulingDTO = {
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver.id,
      }

      await createCarSchedulingService.execute(carScheduling1);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);

      expect(error.message).toEqual('Unable to create a car schedule, to many cars to one driver!');
      expect(error.statusCode).toEqual(400);
      expect(error.module).toEqual('create_car_scheduling_service');
    }
  });

  it('Should not be able to create a car scheduling with a car who aready have a scheduling', async () => {
    try {
      const driver1 = await fakeDriverRepository.create('teste1');
      const driver2 = await fakeDriverRepository.create('teste2');

      const car = await fakeCarRepository.create({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

      const carScheduling = {
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver1.id,
      };

      await createCarSchedulingService.execute(carScheduling);

      const carScheduling1: ICreateCarSchedulingDTO = {
        reason_for_use:'test1',
        car_id: car.id,
        driver_id: driver2.id,
      }

      const teste = await createCarSchedulingService.execute(carScheduling1);
      console.log(teste);

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);

      expect(error.message).toEqual('Unable to create a car schedule, to many drivers to one car!');
      expect(error.statusCode).toEqual(400);
      expect(error.module).toEqual('create_car_scheduling_service');
    }
  });

  it('Should be able to create a car scheduling', async () => {
    const carScheduling: ICreateCarSchedulingDTO = {
      reason_for_use:'test2',
      car_id: 'test2',
      driver_id:'test2',
    }
    const createdCarScheduling = await createCarSchedulingService.execute(carScheduling);

    expect(createdCarScheduling.reason_for_use).toEqual(carScheduling.reason_for_use);
    expect(createdCarScheduling.car_id).toEqual(carScheduling.car_id);
    expect(createdCarScheduling.driver_id).toEqual(carScheduling.driver_id);
    expect(createdCarScheduling.id).not.toBeUndefined();
  });
});
