import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';

describe('Update driver service test', () => {
  let updateDriverService: UpdateDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository(['test1','test2','test3']);

    updateDriverService = new UpdateDriverService(fakeDriverRepository);
  });

  it('Should be able to update a driver', async () => {
    const driverToUpdate = await fakeDriverRepository.findDriverByName('test1');

    driverToUpdate.name = 'test4';

    await updateDriverService.execute(driverToUpdate);

    const foundDriver = await fakeDriverRepository.findDriverById(driverToUpdate.id);

    expect(foundDriver).toEqual(driverToUpdate);
  });
});
