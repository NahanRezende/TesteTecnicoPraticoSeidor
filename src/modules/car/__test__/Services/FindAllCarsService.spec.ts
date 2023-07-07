import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindAllCarsService } from '@modules/car/services/FindAllCarsService';

describe('Find all cars service test', () => {
  let findAllCarsService: FindAllCarsService;

  let fakeCarRepository: ICarRepository;

  beforeAll(() => {
    fakeCarRepository = new FakeCarRepository([
    {
      color: 'TestColor1',
      license_plate: 'TestPlate1',
      brand: 'TestBrand1',
    },
    {
      color: 'TestColor2',
      license_plate: 'TestPlate2',
      brand: 'TestBrand2',
    }]);

    findAllCarsService = new FindAllCarsService(fakeCarRepository);
  });

  it('Should be able to find all cars', async () => {
    const foundCars = await findAllCarsService.execute();

    expect(foundCars.length).toEqual(2);
  });
});
