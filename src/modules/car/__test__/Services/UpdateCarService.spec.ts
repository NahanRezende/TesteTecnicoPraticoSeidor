import { FakeCarRepository } from '@modules/car/repositories/fakes/FakeCarRepository';
import { ICarRepository } from '@modules/car/repositories/ICarRepository';
import { UpdateCarService } from '@modules/car/services/UpdateCarService';

describe('Update car service test', () => {
  let updateCarService: UpdateCarService;

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

    updateCarService = new UpdateCarService(fakeCarRepository);
  });

  it('Should be able to update a car', async () => {
    const [carToUpdate] = await fakeCarRepository.findCarsByColor('TestColor1');

    carToUpdate.brand = 'TestBrand5';
    carToUpdate.color = 'TestColor5';
    carToUpdate.license_plate = 'TestPlate5';

    await updateCarService.execute(carToUpdate);

    const foundCar = await fakeCarRepository.findCarById(carToUpdate.id);

    expect(foundCar).toEqual(carToUpdate);
  });
});
