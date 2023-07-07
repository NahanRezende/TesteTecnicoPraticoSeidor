import { FakeDriverRepository } from '@modules/driver/repositories/fakes/FakeDriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { CreateDriverService } from '@modules/driver/services/CreateDriverService';

describe('Create driver service test', () => {
  let createDriverService: CreateDriverService;

  let fakeDriverRepository: IDriverRepository;

  beforeAll(() => {
    fakeDriverRepository = new FakeDriverRepository();

    createDriverService = new CreateDriverService(fakeDriverRepository);
  });

  it('Should be able to create a driver', async () => {

    const createdDriver = await createDriverService.execute('test1');

    expect(createdDriver.name).toEqual('test1');
    expect(createdDriver.id).not.toBeUndefined();
  });
});
