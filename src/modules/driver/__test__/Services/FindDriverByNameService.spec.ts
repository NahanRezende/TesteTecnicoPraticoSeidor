import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { FindDriverByNameService } from '@modules/driver/services/FindDriverByNameService';

describe('Find a driver by name service test', () => {
  let findDriverByNameService: FindDriverByNameService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository(['test1','test2','test3']);

    findDriverByNameService = new FindDriverByNameService(fakeDriverRepository);
  });

  it('Should be able to find a driver by name', async () => {
    const foundDriver = await findDriverByNameService.execute('test1');

    expect(foundDriver.name).toEqual('test1');
  });
});
