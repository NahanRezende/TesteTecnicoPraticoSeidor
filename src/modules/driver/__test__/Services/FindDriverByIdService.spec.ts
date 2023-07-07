import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { FindDriverByIdService } from '@modules/driver/services/FindDriverByIdService';

describe('Find driver by id service test', () => {
  let findDriverByIdService: FindDriverByIdService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository(['test1','test2','test3']);

    findDriverByIdService = new FindDriverByIdService(fakeDriverRepository);
  });

  it('Should be able to find a driver by id', async () => {
    const driverToFound = await fakeDriverRepository.findDriverByName('test1');

    const foundDriver = await findDriverByIdService.execute(driverToFound.id);

    expect(foundDriver.id).toEqual(driverToFound.id);
  });
});
