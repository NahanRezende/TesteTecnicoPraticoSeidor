import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { DeleteDriverService } from '@modules/driver/services/DeleteDriverService';

describe('Delete driver service test', () => {
  let deleteDriverService: DeleteDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository(['test1','test2','test3']);

    deleteDriverService = new DeleteDriverService(fakeDriverRepository);
  });

  it('Should be able to delete a driver', async () => {
    const driverToDelete = await fakeDriverRepository.findDriverByName('test1');

    await deleteDriverService.execute(driverToDelete.id);

    const foundDriver = await fakeDriverRepository.findDriverById(driverToDelete.id);

    expect(foundDriver).toBeUndefined();
  });
});
