import { CarScheduling } from '@modules/car_scheduling/infra/typeorm/entities/CarScheduling';
import { CreateCarSchedulingService } from '@modules/car_scheduling/services/CreateCarSchedulingService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car_scheduling/services/CreateCarSchedulingService');
const createCarSchedulingService = CreateCarSchedulingService as jest.MockedClass<
  typeof CreateCarSchedulingService
>;

describe('Create car scheduling controller test', () => {
  beforeEach(() => {
    createCarSchedulingService.mockClear();
  });

  it('Should be able to create a car scheduling', async () => {
    const carScheduling = new CarScheduling();

    await createCarSchedulingService.prototype.execute.mockResolvedValueOnce(
      carScheduling,
    );

    const response = await request(app)
      .post(`/car_scheduling/`)
      .send({
        reason_for_use:'test1',
        car_id: 'test1',
        driver_id:'test1',
      });

    expect(response.body).toEqual(carScheduling);
    expect(response.statusCode).toEqual(200);
    expect(createCarSchedulingService.prototype.execute).toHaveBeenCalledWith(
      {
        reason_for_use:'test1',
        car_id: 'test1',
        driver_id:'test1',
      }
    );
  });
});
