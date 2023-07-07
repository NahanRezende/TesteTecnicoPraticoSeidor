import { DeleteCarService } from '@modules/car/services/DeleteCarService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/DeleteCarService');
const deleteCarService = DeleteCarService as jest.MockedClass<
  typeof DeleteCarService
>;

describe('Delete car controller test', () => {
  beforeEach(() => {
    deleteCarService.mockClear();
  });

  it('Should be able to delete a car', async () => {
    const response = await request(app)
      .delete(`/cars/test1`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(deleteCarService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
