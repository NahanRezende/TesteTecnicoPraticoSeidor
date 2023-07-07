import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FindCarsByColorService } from '@modules/car/services/FindCarsByColorService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/FindCarsByColorService');
const findCarsByColorService = FindCarsByColorService as jest.MockedClass<
  typeof FindCarsByColorService
>;

describe('Find cars by color controller test', () => {
  beforeEach(() => {
    findCarsByColorService.mockClear();
  });

  it('Should be able to find all cars by color', async () => {
    const car = new Car();

    await findCarsByColorService.prototype.execute.mockResolvedValueOnce(
     [car]
    );

    const response = await request(app)
      .get(`/cars/find_by_color/test1`)
      .send();

    expect(response.body).toEqual([car]);
    expect(response.statusCode).toEqual(200);
    expect(findCarsByColorService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
