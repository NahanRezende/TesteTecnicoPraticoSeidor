import { CreateCarService } from "@modules/car/services/CreateCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response>{
    const car = request.body;

    const createCarService = container.resolve(CreateCarService);

    const createdCar = await createCarService.execute(car);

    return response.json(createdCar);
  }
}
