import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { CreateDriverService } from '@modules/driver/services/CreateDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/CreateDriverService');
const createDriverService = CreateDriverService as jest.MockedClass<
  typeof CreateDriverService
>;

describe('Create driver controller test', () => {
  beforeEach(() => {
    createDriverService.mockClear();
  });

  it('Should be able to create a driver', async () => {
    const driver = new Driver();

    await createDriverService.prototype.execute.mockResolvedValueOnce(
      driver,
    );

    const response = await request(app)
      .post(`/drivers/`)
      .send({
        name: 'test1'
      });

    expect(response.body).toEqual(driver);
    expect(response.statusCode).toEqual(200);
    expect(createDriverService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
