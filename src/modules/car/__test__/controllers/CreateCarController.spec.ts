import { Car } from '@modules/car/infra/typeorm/entities/Car';
import { CreateCarService } from '@modules/car/services/CreateCarService';
import { app } from '@shared/infra/http/app';
import request from 'supertest';

jest.mock('@modules/car/services/CreateCarService');
const createCarService = CreateCarService as jest.MockedClass<
  typeof CreateCarService
>;

describe('Create car controller test', () => {
  beforeEach(() => {
    createCarService.mockClear();
  });

  it('Should be able to create a car', async () => {
    const car = new Car();

    await createCarService.prototype.execute.mockResolvedValueOnce(
      car,
    );

    const response = await request(app)
      .post(`/cars/`)
      .send({
        color: 'TestColor1',
        license_plate: 'TestPlate1',
        brand: 'TestBrand1',
      });

    expect(response.body).toEqual(car);
    expect(response.statusCode).toEqual(200);
    expect(createCarService.prototype.execute).toHaveBeenCalledWith(
      {
        color: 'TestColor1',
        license_plate: 'TestPlate1',
        brand: 'TestBrand1',
      }
    );
  });
});
