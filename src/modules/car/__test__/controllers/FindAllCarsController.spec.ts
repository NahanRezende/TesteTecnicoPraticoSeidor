import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FindAllCarsService } from '@modules/car/services/FindAllCarsService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/FindAllCarsService');
const findAllCarsService = FindAllCarsService as jest.MockedClass<
  typeof FindAllCarsService
>;

describe('Find all cars controller test', () => {
  beforeEach(() => {
    findAllCarsService.mockClear();
  });

  it('Should be able to find all cars', async () => {
    const car1 = new Car();
    const car2 = new Car();

    await findAllCarsService.prototype.execute.mockResolvedValueOnce(
      [car1, car2]
    );

    const response = await request(app)
      .get(`/cars/`)
      .send();

    expect(response.body).toEqual([car1, car2]);
    expect(response.statusCode).toEqual(200);
  });
});
