import { UpdateCarService } from "@modules/car/services/UpdateCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateCarController {
  async handle(request: Request, response: Response): Promise<Response>{
    const car = request.body;

    const updateCarService = container.resolve(UpdateCarService);

    const updatedCar = await updateCarService.execute(car);

    return response.json(updatedCar);
  }
}
