import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { FindAllDriversService } from '@modules/driver/services/FindAllDriversService';

describe('Find all drivers service test', () => {
  let findAllDriversService: FindAllDriversService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository(['test1','test2','test3']);

    findAllDriversService = new FindAllDriversService(fakeDriverRepository);
  });

  it('Should be able to find all drivers', async () => {
    const foundDrivers = await findAllDriversService.execute();

    expect(foundDrivers.length).toEqual(3);
  });
});
