import { ICreateCarSchedulingDTO } from '@modules/car_scheduling/dtos/ICreateCarSchedulingDTO';
import { FakeCarSchedulingRepository } from '@modules/car_scheduling/repositories/fakes/FakeCarSchedulingRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { EndCarSchedulingService } from '@modules/car_scheduling/services/EndCarSchedulingService';
import AppError from '@shared/errors/AppError';

describe('End car scheduling service test', () => {
  let endCarSchedulingService: EndCarSchedulingService;

  let fakeCarSchedulinRepository: ICarSchedulingRepository;

  beforeAll(() => {
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository([{
      reason_for_use:'test1',
      car_id: 'test1',
      driver_id:'test1',
    }]);

    endCarSchedulingService = new EndCarSchedulingService(fakeCarSchedulinRepository);
  });

  afterEach(async () => {
    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();
  });

  it('Should not be able to end a car scheduling to a driver who does not have a scheduling', async () => {
    try {
      await endCarSchedulingService.execute('test2');

      expect(true).toEqual(false);
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);

      expect(error.message).toEqual('There is no Car Schedule to end!');
      expect(error.statusCode).toEqual(400);
      expect(error.module).toEqual('end_car_scheduling');
    }
  });

  it('Should be able to end a car scheduling', async () => {
    const createdCarScheduling = await endCarSchedulingService.execute('test1');

    expect(createdCarScheduling.reason_for_use).toEqual('test1');
    expect(createdCarScheduling.car_id).toEqual('test1');
    expect(createdCarScheduling.driver_id).toEqual('test1');
    expect(createdCarScheduling.end_date_of_use).not.toBeUndefined();
    expect(createdCarScheduling.id).not.toBeUndefined();
  });
});
