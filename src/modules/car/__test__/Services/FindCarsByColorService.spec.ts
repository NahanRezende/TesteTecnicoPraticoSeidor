import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindCarsByColorService } from '@modules/car/services/FindCarsByColorService';

describe('Find all cars by color service test', () => {
  let findCarsByColorService: FindCarsByColorService;

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

    findCarsByColorService = new FindCarsByColorService(fakeCarRepository);
  });

  it('Should be able to find all cars by color', async () => {
    const foundCars = await findCarsByColorService.execute('TestColor2');

    expect(foundCars.length).toEqual(2);
  });
});
