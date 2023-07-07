import { CarScheduling } from '@modules/car_scheduling/infra/typeorm/entities/CarScheduling';
import { CarSchedulingRepository } from '@modules/car_scheduling/infra/typeorm/repositories/CarSchedulingRepository';
import { ICarSchedulingRepository } from '@modules/car_scheduling/repositories/ICarSchedulingRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';

describe('Car Scheduling repository test', () => {
  let ormCarsSchedulingRepository: Repository<CarScheduling>;
  let ormCarRepository: Repository<Car>;
  let ormDriverRepository: Repository<Driver>;

  let carSchedulingRepository: ICarSchedulingRepository;

  beforeAll(async () => {
    ormCarsSchedulingRepository = dataSource.getRepository(CarScheduling);
    ormCarRepository = dataSource.getRepository(Car);
    ormDriverRepository = dataSource.getRepository(Driver);

    carSchedulingRepository = new CarSchedulingRepository();
  });

  afterEach(async () => {
    await ormCarsSchedulingRepository.delete({});
    await ormDriverRepository.delete({});
    await ormCarRepository.delete({});
  });

  it('Should be able to create a car scheduling', async () => {
    const driver = await ormDriverRepository.save({ name: 'teste1' });

    const car = await ormCarRepository.save({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    const carSchedulingCreated = await carSchedulingRepository.create(carScheduling);

    expect(carSchedulingCreated).toBeInstanceOf(CarScheduling);
    expect(carSchedulingCreated.car_id).toEqual(car.id);
    expect(carSchedulingCreated.driver_id).toEqual(driver.id);
  });

  it('Should be able to update a car scheduling', async () => {
    const driver = await ormDriverRepository.save({ name: 'teste1' });

    const car = await ormCarRepository.save({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    const carSchedulingCreated = await carSchedulingRepository.create(carScheduling);

    carSchedulingCreated.reason_for_use = 'test2';

    const carSchedulingUpdated = await carSchedulingRepository.update(carSchedulingCreated);

    expect(carSchedulingUpdated.id).toEqual(carSchedulingCreated.id);
    expect(carSchedulingUpdated.reason_for_use).toEqual('test2');
  });

  it('Should be able to find a car scheduling by car id', async () => {
    const driver = await ormDriverRepository.save({ name: 'teste1' });

    const car = await ormCarRepository.save({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    const carSchedulingCreated = await carSchedulingRepository.create(carScheduling);

    const [foundCarScheduling] = await carSchedulingRepository.findByCarId(carSchedulingCreated.car_id);

    expect(carSchedulingCreated).toEqual(foundCarScheduling);
  });

  it('Should be able to find a car scheduling by driver id', async () => {
    const driver = await ormDriverRepository.save({ name: 'teste1' });

    const car = await ormCarRepository.save({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    const carSchedulingCreated = await carSchedulingRepository.create(carScheduling);

    const [foundCarScheduling] = await carSchedulingRepository.findByDriverId(carSchedulingCreated.driver_id);

    expect(carSchedulingCreated).toEqual(foundCarScheduling);
  });

  it('Should be able to find all car scheduling', async () => {
    const driver = await ormDriverRepository.save({ name: 'teste1' });

    const car = await ormCarRepository.save({ brand: 'teste1', color: 'teste1', license_plate: 'teste1'});

    const carScheduling = {
      reason_for_use:'test1',
      car_id: car.id,
      driver_id: driver.id,
    };

    await carSchedulingRepository.create(carScheduling);

    const foundCarScheduling = await carSchedulingRepository.findAll();

    expect(foundCarScheduling.length).toEqual(1);
    expect(foundCarScheduling[0].reason_for_use).toEqual(carScheduling.reason_for_use);
  });
});
