import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindDriverByNameService } from '@modules/driver/services/FindDriverByNameService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/FindDriverByNameService');
const findDriverByNameService = FindDriverByNameService as jest.MockedClass<
  typeof FindDriverByNameService
>;

describe('Find driver by name controller test', () => {
  beforeEach(() => {
    findDriverByNameService.mockClear();
  });

  it('Should be able to find a driver by name', async () => {
    const driver = new Driver();

    await findDriverByNameService.prototype.execute.mockResolvedValueOnce(
     driver
    );

    const response = await request(app)
      .get(`/drivers/find_by_name/test1`)
      .send();

    expect(response.body).toEqual(driver);
    expect(response.statusCode).toEqual(200);
    expect(findDriverByNameService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
