import { CarScheduling } from '@modules/car_scheduling/infra/typeorm/entities/CarScheduling';
import { EndCarSchedulingService } from '@modules/car_scheduling/services/EndCarSchedulingService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car_scheduling/services/EndCarSchedulingService');
const endCarSchedulingService = EndCarSchedulingService as jest.MockedClass<
  typeof EndCarSchedulingService
>;

describe('End car scheduling controller test', () => {
  beforeEach(() => {
    endCarSchedulingService.mockClear();
  });

  it('Should be able to end car scheduling', async () => {
    const carScheduling = new CarScheduling();

    await endCarSchedulingService.prototype.execute.mockResolvedValueOnce(
      carScheduling,
    );

    const response = await request(app)
      .put(`/car_scheduling/123456`)
      .send();

    expect(response.body).toEqual(carScheduling);
    expect(response.statusCode).toEqual(200);
    expect(endCarSchedulingService.prototype.execute).toHaveBeenCalledWith('123456');
  });
});
