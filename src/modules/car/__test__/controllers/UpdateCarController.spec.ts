import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { UpdateCarService } from '@modules/car/services/UpdateCarService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/UpdateCarService');
const updateCarService = UpdateCarService as jest.MockedClass<
  typeof UpdateCarService
>;

describe('Update car controller test', () => {
  beforeEach(() => {
    updateCarService.mockClear();
  });

  it('Should be able to update a car', async () => {
    const car = new Car();

    await updateCarService.prototype.execute.mockResolvedValueOnce(
      car,
    );

    const response = await request(app)
      .put(`/cars/`)
      .send(car);

    expect(response.body).toEqual(car);
    expect(response.statusCode).toEqual(200);
    expect(updateCarService.prototype.execute).toHaveBeenCalledWith(car);
  });
});
