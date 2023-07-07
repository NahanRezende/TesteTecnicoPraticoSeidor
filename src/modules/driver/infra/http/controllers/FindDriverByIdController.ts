import { FindDriverByIdService } from "@modules/driver/services/FindDriverByIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindDriverByIdController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { driver_id } = request.params;

    const findDriverByIdService = container.resolve(FindDriverByIdService);

    const drivers = await findDriverByIdService.execute(driver_id);

    return response.json(drivers);
  }
}
