import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FindCarsByBrandService } from '@modules/car/services/FindCarsByBrandService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/FindCarsByBrandService');
const findCarsByBrandService = FindCarsByBrandService as jest.MockedClass<
  typeof FindCarsByBrandService
>;

describe('Find cars by brand controller test', () => {
  beforeEach(() => {
    findCarsByBrandService.mockClear();
  });

  it('Should be able to find all cars by brand', async () => {
    const car = new Car();

    await findCarsByBrandService.prototype.execute.mockResolvedValueOnce(
     [car]
    );

    const response = await request(app)
      .get(`/cars/find_by_brand/test1`)
      .send();

    expect(response.body).toEqual([car]);
    expect(response.statusCode).toEqual(200);
    expect(findCarsByBrandService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
