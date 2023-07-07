import { CarScheduling } from '@modules/car_scheduling/infra/typeorm/entities/CarScheduling';
import { ListAllCarSchedulingService } from '@modules/car_scheduling/services/ListAllCarSchedulingService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car_scheduling/services/ListAllCarSchedulingService');
const listAllCarSchedulingService = ListAllCarSchedulingService as jest.MockedClass<
  typeof ListAllCarSchedulingService
>;

describe('List all cars scheduling controller test', () => {
  beforeEach(() => {
    listAllCarSchedulingService.mockClear();
  });

  it('Should be able to list all cars scheduling', async () => {
    const car1 = new CarScheduling();
    const car2 = new CarScheduling();

    listAllCarSchedulingService.prototype.execute.mockResolvedValueOnce(
      [car1, car2]
    );

    const response = await request(app)
      .get(`/car_scheduling/`)
      .send();

    expect(response.body).toEqual([car1, car2]);
    expect(response.statusCode).toEqual(200);
  });
});
