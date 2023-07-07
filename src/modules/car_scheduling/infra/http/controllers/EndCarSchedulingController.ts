import { EndCarSchedulingService } from "@modules/car_scheduling/services/EndCarSchedulingService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class EndCarSchedulingController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { driver_id } = request.params;

    const endCarSchedulingService = container.resolve(EndCarSchedulingService);

    const carScheduling = await endCarSchedulingService.execute(driver_id);

    return response.json(carScheduling);
  }
}
