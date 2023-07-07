import { FakeCarSchedulingRepository } from '@modules/car_scheduling/repositories/fakes/FakeCarSchedulingRepository';
import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { ListAllCarSchedulingService } from '@modules/car_scheduling/services/ListAllCarSchedulingService';

describe('List all car scheduling service test', () => {
  let fakeCarRepository: ICarRepository;
  let fakeCarSchedulinRepository: ICarSchedulingRepository;
  let fakeDriverRepository: IDriverRepository;

  let listAllCarSchedulingService: ListAllCarSchedulingService;

  beforeAll(async () => {
    fakeCarRepository = new FakeCarRepository();

    fakeDriverRepository = new FakeDriverRepository();

    fakeCarSchedulinRepository = new FakeCarSchedulingRepository();

    listAllCarSchedulingService = new ListAllCarSchedulingService(
      fakeCarRepository,
      fakeCarSchedulinRepository,
      fakeDriverRepository
    );
  });

  it('Should be able to list all cars scheduling', async () => {
    const driver = await fakeDriverRepository.create('teste1');

    const car = await fakeCarRepository.create({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    const createdCarScheduling = await fakeCarSchedulinRepository.create(carScheduling);

    const foundCarScheduling = await listAllCarSchedulingService.execute();

    expect(foundCarScheduling.length).toBe(1);
    expect(foundCarScheduling[0].id).toEqual(createdCarScheduling.id);
  });
});
