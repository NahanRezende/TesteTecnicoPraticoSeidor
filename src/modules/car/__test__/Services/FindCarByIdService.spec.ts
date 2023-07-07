import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { FindCarByIdService } from '@modules/car/services/FindCarByIdService';

describe('Find car by id service test', () => {
  let findCarByIdService: FindCarByIdService;

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

    findCarByIdService = new FindCarByIdService(fakeCarRepository);
  });

  it('Should be able to find a car by id', async () => {
    const [carToFound] = await fakeCarRepository.findCarsByColor('TestColor1');

    const foundCar = await findCarByIdService.execute(carToFound.id);

    expect(foundCar.id).toEqual(carToFound.id);
  });
});
