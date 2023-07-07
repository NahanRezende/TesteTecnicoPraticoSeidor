import { Router } from 'express';
import { CreateDriverController } from '../controllers/CreateDriverController';
import { DeleteDriverController } from '../controllers/DeleteDriverController';
import { FindAllDriversController } from '../controllers/FindAllDriversController';
import { FindDriverByIdController } from '../controllers/FindDriverByIdController';
import { FindDriverByNameController } from '../controllers/FindDriverByNameController';
import { UpdateDriverController } from '../controllers/UpdateDriverController';

const driverRouter = Router();

const createDriverController = new CreateDriverController();
const deleteDriverController = new DeleteDriverController();
const findAllDriversController = new FindAllDriversController();
const findDriverByIdController = new FindDriverByIdController();
const findDriverByNameController = new FindDriverByNameController();
const updateDriverController = new UpdateDriverController();

driverRouter.post('/', createDriverController.handle);

driverRouter.delete('/:driver_id', deleteDriverController.handle);

driverRouter.get('/', findAllDriversController.handle);

driverRouter.get('/:driver_id', findDriverByIdController.handle);

driverRouter.get('/find_by_name/:name', findDriverByNameController.handle);

driverRouter.put('/', updateDriverController.handle);

export { driverRouter }
