import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CarRepository } from '@modules/car/infra/typeorm/repositories/CarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('Car repository test', () => {
  let ormCarsRepository: Repository<Car>;

  let carRepository: ICarRepository;

  beforeAll(async () => {
    ormCarsRepository = dataSource.getRepository(Car);

    carRepository = new CarRepository();
  });

  beforeEach(async () => {
    await ormCarsRepository.save([
      {
        color: 'TestColor1',
        license_plate: 'TestPlate1',
        brand: 'TestBrand1',
      },
      {
        color: 'TestColor2',
        license_plate: 'TestPlate2',
        brand: 'TestBrand2',
      },
    ]);
  });

  afterEach(async () => {
    await ormCarsRepository.delete({});
  });

  it('Should be able to create a car', async () => {
    const car = {
      color: 'Black',
      license_plate: 'TestPlate',
      brand: 'TestBrand',
    };

    const carCreated = await carRepository.create(car);

    const foundCar = await carRepository.findCarById(carCreated.id);

    expect(carCreated).toEqual(foundCar);
  });

  it('Should be able to update a car', async () => {
    const [carToUpdate] = await carRepository.findCarsByColor('TestColor1');

    carToUpdate.color = 'TestColor3';
    carToUpdate.brand = 'TestBrand3';
    carToUpdate.license_plate = 'TestPlate3';

    await carRepository.update(carToUpdate);

    const foundCar = await carRepository.findCarById(carToUpdate.id);

    expect(carToUpdate).toEqual(foundCar);
  });

  it('Should be able to delete a car', async () => {
    const [carToDelete] = await carRepository.findCarsByColor('TestColor1');

    await carRepository.delete(carToDelete.id);

    const foundCars = await carRepository.findCarById(carToDelete.id);

    expect(foundCars).toBeNull();
  });

  it('Should be able to find a car by id', async () => {
    const [carToFind] = await carRepository.findCarsByColor('TestColor1');

    const foundCar = await carRepository.findCarById(carToFind.id);

    expect(foundCar).toEqual(carToFind);
  });

  it('Should be able to find a car by brand', async () => {
    const [carToFind] = await carRepository.findCarsByBrand('TestBrand2');

    expect(carToFind.brand).toEqual('TestBrand2');
  });

  it('Should be able to find a car by color', async () => {
    const [carToFind] = await carRepository.findCarsByColor('TestColor1');

    expect(carToFind.color).toEqual('TestColor1');
  });

  it('Should be able to find all cars', async () => {
    const foundCars = await carRepository.findAll();

    expect(foundCars.length).toEqual(2);
  });
});
