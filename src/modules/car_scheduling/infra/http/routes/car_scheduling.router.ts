import { Router } from 'express';
import { CreateCarSchedulingController } from '../controllers/CreateCarSchedulingController';
import { EndCarSchedulingController } from '../controllers/EndCarSchedulingController';
import { ListAllCarSchedulingController } from '../controllers/ListAllCarSchedulingController';

const carSchedulingRouter = Router();

const createCarSchedulingController = new CreateCarSchedulingController();
const endCarSchedulingController = new EndCarSchedulingController();
const listAllCarSchedulingController = new ListAllCarSchedulingController();

carSchedulingRouter.post('/', createCarSchedulingController.handle);

carSchedulingRouter.put('/:driver_id', endCarSchedulingController.handle);

carSchedulingRouter.get('/', listAllCarSchedulingController.handle);

export { carSchedulingRouter }
