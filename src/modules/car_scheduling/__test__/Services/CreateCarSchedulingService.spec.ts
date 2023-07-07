import { ICreateCarSchedulingDTO } from '@modules/car_scheduling/dtos/ICreateCarSchedulingDTO';
import { FakeCarSchedulingRepository } from '@modules/car_scheduling/repositories/fakes/FakeCarSchedulingRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { CreateCarSchedulingService } from '@modules/car_scheduling/services/CreateCarSchedulingService';
import AppError from '@shared/errors/AppError';

describe('Create car scheduling service test', () => {
  let createCarSchedulingService: CreateCarSchedulingService;

  let fakeCarSchedulinRepository: ICarSchedulingRepository;

  beforeAll(() => {
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository([{
      reason_for_use:'test1',
      car_id: 'test1',
      driver_id:'test1',
    }]);

    createCarSchedulingService = new CreateCarSchedulingService(fakeCarSchedulinRepository);
  });

  afterEach(async () => {
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();
  });

  it('Should not be able to create a car scheduling to a driver who aready have a scheduling', async () => {
    try {
      const carScheduling1: ICreateCarSchedulingDTO = {
        reason_for_use:'test1',
        car_id: 'test1',
        driver_id:'test1',
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
      const carScheduling1: ICreateCarSchedulingDTO = {
        reason_for_use:'test1',
        car_id: 'test1',
        driver_id:'test2',
      }

      await createCarSchedulingService.execute(carScheduling1);

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
