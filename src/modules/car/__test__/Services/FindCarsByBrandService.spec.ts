import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindCarsByBrandService } from '@modules/car/services/FindCarsByBrandService';

describe('Find all cars by brand service test', () => {
  let findCarsByBrandService: FindCarsByBrandService;

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
    },
    {
      color: 'TestColor2',
      license_plate: 'TestPlate3',
      brand: 'TestBrand2',
    }]);

    findCarsByBrandService = new FindCarsByBrandService(fakeCarRepository);
  });

  it('Should be able to find all cars by brand', async () => {
    const foundCars = await findCarsByBrandService.execute('TestBrand2');

    expect(foundCars.length).toEqual(2);
  });
});
