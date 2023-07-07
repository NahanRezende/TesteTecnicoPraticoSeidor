import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { DriverRepository } from '@modules/driver/infra/typeorm/repositories/DriverRepository';
import { IDriverRepository } from '@modules/driver/repositories/IDriverRepository';
import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

describe('Driver repository test', () => {
  let ormDriverRepository: Repository<Driver>;

  let driverRepository: IDriverRepository;

  beforeAll(async () => {
    ormDriverRepository = dataSource.getRepository(Driver);

    driverRepository = new DriverRepository();
  });

  afterEach(async () => {
    await ormDriverRepository.delete({});
  });

  it('Should be able to create a driver', async () => {
    const driverCreated = await driverRepository.create('test1');

    const foundDriver = await driverRepository.findDriverById(driverCreated.id);

    expect(driverCreated).toEqual(foundDriver);
  });

  it('Should be able to update a driver', async () => {
    const driverToUpdate = await driverRepository.create('test1');

    driverToUpdate.name = 'test2';

    await driverRepository.update(driverToUpdate);

    const foundDriver = await driverRepository.findDriverById(driverToUpdate.id);

    expect(driverToUpdate).toEqual(foundDriver);
  });

  it('Should be able to delete a driver', async () => {
    const driverToDelete = await driverRepository.create('test1');

    await driverRepository.delete(driverToDelete.id);

    const foundDriver = await driverRepository.findDriverById(driverToDelete.id);

    expect(foundDriver).toBeNull();
  });

  it('Should be able to find a driver by id', async () => {
    const driverToFind = await driverRepository.create('test1');

    const foundDriver = await driverRepository.findDriverById(driverToFind.id);

    expect(driverToFind).toEqual(foundDriver);
  });

  it('Should be able to find a driver by name', async () => {
    await driverRepository.create('test1');

    const driverToFind = await driverRepository.findDriverByName('test1');

    expect(driverToFind.name).toEqual('test1');
  });

  it('Should be able to find all drivers', async () => {
    await driverRepository.create('test1');
    await driverRepository.create('test2');

    const foundDrivers = await driverRepository.findAll();

    expect(foundDrivers.length).toEqual(2);
  });
});
