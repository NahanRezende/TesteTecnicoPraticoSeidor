import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { FindDriverByIdService } from '@modules/driver/services/FindDriverByIdService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/FindDriverByIdService');
const findDriverByIdService = FindDriverByIdService as jest.MockedClass<
  typeof FindDriverByIdService
>;

describe('Find driver by id controller test', () => {
  beforeEach(() => {
    findDriverByIdService.mockClear();
  });

  it('Should be able to find a driver by id', async () => {
    const driver = new Driver();

    await findDriverByIdService.prototype.execute.mockResolvedValueOnce(
      driver
    );

    const response = await request(app)
      .get(`/drivers/123456`)
      .send();

    expect(response.body).toEqual(driver);
    expect(response.statusCode).toEqual(200);
    expect(findDriverByIdService.prototype.execute).toHaveBeenCalledWith('123456');
  });
});
