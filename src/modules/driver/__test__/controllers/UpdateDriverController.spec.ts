import { Driver } from '@modules/driver/infra/typeorm/entities/Driver';
import { UpdateDriverService } from '@modules/driver/services/UpdateDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/UpdateDriverService');
const updateDriverService = UpdateDriverService as jest.MockedClass<
  typeof UpdateDriverService
>;

describe('Update driver controller test', () => {
  beforeEach(() => {
    updateDriverService.mockClear();
  });

  it('Should be able to update a driver', async () => {
    const driver = new Driver();

    await updateDriverService.prototype.execute.mockResolvedValueOnce(
      driver,
    );

    const response = await request(app)
      .put(`/drivers/`)
      .send(driver);

    expect(response.body).toEqual(driver);
    expect(response.statusCode).toEqual(200);
    expect(updateDriverService.prototype.execute).toHaveBeenCalledWith(driver);
  });
});
