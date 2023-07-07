import { DeleteDriverService } from '@modules/driver/services/DeleteDriverService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/driver/services/DeleteDriverService');
const deleteDriverService = DeleteDriverService as jest.MockedClass<
  typeof DeleteDriverService
>;

describe('Delete driver controller test', () => {
  beforeEach(() => {
    deleteDriverService.mockClear();
  });

  it('Should be able to delete a driver', async () => {
    const response = await request(app)
      .delete(`/drivers/123456`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(deleteDriverService.prototype.execute).toHaveBeenCalledWith('123456');
  });
});
