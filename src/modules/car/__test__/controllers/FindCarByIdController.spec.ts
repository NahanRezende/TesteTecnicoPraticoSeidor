import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { FindCarByIdService } from '@modules/car/services/FindCarByIdService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/FindCarByIdService');
const findCarByIdService = FindCarByIdService as jest.MockedClass<
  typeof FindCarByIdService
>;

describe('Find car by id controller test', () => {
  beforeEach(() => {
    findCarByIdService.mockClear();
  });

  it('Should be able to find a car by id', async () => {
    const car = new Car();

    await findCarByIdService.prototype.execute.mockResolvedValueOnce(
      car
    );

    const response = await request(app)
      .get(`/cars/test1`)
      .send();

    expect(response.body).toEqual(car);
    expect(response.statusCode).toEqual(200);
    expect(findCarByIdService.prototype.execute).toHaveBeenCalledWith('test1');
  });
});
