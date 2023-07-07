import { ListAllCarSchedulingService } from "@modules/car_scheduling/services/ListAllCarSchedulingService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class ListAllCarSchedulingController {
  async handle(request: Request, response: Response): Promise<Response>{
    const listAllCarSchedulingService = container.resolve(ListAllCarSchedulingService);

    const carScheduling = await listAllCarSchedulingService.execute();

    return response.json(carScheduling);
  }
}
