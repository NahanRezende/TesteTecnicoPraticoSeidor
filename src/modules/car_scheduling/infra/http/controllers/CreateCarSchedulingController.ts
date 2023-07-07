import { CreateCarSchedulingService } from "@modules/car_scheduling/services/CreateCarSchedulingService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateCarSchedulingController {
  async handle(request: Request, response: Response): Promise<Response>{
    const carScheduling = request.body;

    const createCarSchedulingService = container.resolve(CreateCarSchedulingService);

    const createdCarScheduling = await createCarSchedulingService.execute(carScheduling);

    return response.json(createdCarScheduling);
  }
}
