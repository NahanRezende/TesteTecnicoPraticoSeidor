import { carRouter } from '@modules/car/infra/http/routes/car.routes';
import { carSchedulingRouter } from '@modules/car_scheduling/infra/http/routes/car_scheduling.router';
import { driverRouter } from '@modules/driver/infra/http/routes/driver.routes';
import { Router } from 'express';

const router = Router();

router.use('/cars', carRouter);
router.use('/drivers', driverRouter);
router.use('/car_scheduling', carSchedulingRouter);

export { router };
