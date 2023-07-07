import { ICreateCarDTO } from '@modules/car/dtos/ICreateCarDTO';
import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { CreateCarService } from '@modules/car/services/CreateCarService';

describe('Create car service test', () => {
  let createCarService: CreateCarService;

  let fakeCarRepository: ICarRepository;

  beforeAll(() => {
    fakeCarRepository = new FakeCarRepository();

    createCarService = new CreateCarService(fakeCarRepository);
  });

  it('Should be able to create a car', async () => {
    const car: ICreateCarDTO = {
      color: 'TestColor1',
      license_plate: 'TestPlate1',
      brand: 'TestBrand1',
    }
    const foundCar = await createCarService.execute(car);

    expect(foundCar.brand).toEqual(car.brand);
    expect(foundCar.color).toEqual(car.color);
    expect(foundCar.license_plate).toEqual(car.license_plate);
  });
});
