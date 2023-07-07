import { Router } from 'express';
import { CreateCarController } from '../controllers/CreateCarController';
import { DeleteCarController } from '../controllers/DeleteCarController';
import { FindAllCarsController } from '../controllers/FindAllCarsController';
import { FindCarByIdController } from '../controllers/FindCarByIdController';
import { FindCarsByBrandController } from '../controllers/FindCarsByBrandController';
import { FindCarsByColorController } from '../controllers/FindCarsByColorController';
import { UpdateCarController } from '../controllers/UpdateCarController';

const carRouter = Router();

const createCarController = new CreateCarController();
const deleteCarController = new DeleteCarController();
const findAllCarsController = new FindAllCarsController();
const findCarByIdController = new FindCarByIdController();
const findCarsByBrandController = new FindCarsByBrandController();
const findCarsByColorController = new FindCarsByColorController();
const updateCarController = new UpdateCarController()

carRouter.post('/', createCarController.handle);

carRouter.delete('/:car_id', deleteCarController.handle);

carRouter.get('/', findAllCarsController.handle);

carRouter.get('/:car_id', findCarByIdController.handle);

carRouter.get('/find_by_brand/:brand', findCarsByBrandController.handle);

carRouter.get('/find_by_color/:color', findCarsByColorController.handle);

carRouter.put('/', updateCarController.handle);




export { carRouter };
