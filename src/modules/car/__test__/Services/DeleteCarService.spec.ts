import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { DeleteCarService } from '@modules/car/services/DeleteCarService';

describe('Delete car service test', () => {
  let deleteCarService: DeleteCarService;

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

    deleteCarService = new DeleteCarService(fakeCarRepository);
  });

  it('Should be able to delete a car', async () => {
    const [carToDelete] = await fakeCarRepository.findCarsByColor('TestColor1');

    await deleteCarService.execute(carToDelete.id);

    const foundCar = await fakeCarRepository.findCarById(carToDelete.id);

    expect(foundCar).toBeUndefined();
  });
});
