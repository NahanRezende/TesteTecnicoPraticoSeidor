import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindAllDriversService } from '@modules/driver/services/FindAllDriversService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/FindAllDriversService');
const findAllDriversService = FindAllDriversService as jest.MockedClass<
  typeof FindAllDriversService
>;

describe('Find all drivers controller test', () => {
  beforeEach(() => {
    findAllDriversService.mockClear();
  });

  it('Should be able to find all drivers', async () => {
    const driver1 = new Driver();
    const driver2 = new Driver();

    await findAllDriversService.prototype.execute.mockResolvedValueOnce(
      [driver1, driver2]
    );

    const response = await request(app)
      .get(`/drivers/`)
      .send();

    expect(response.body).toEqual([driver1, driver2]);
    expect(response.statusCode).toEqual(200);
  });
});
