import { FindAllDriversService } from "@modules/driver/services/FindAllDriversService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindAllDriversController {
  async handle(request: Request, response: Response): Promise<Response>{
    const findAllDriversService = container.resolve(FindAllDriversService);

    const drivers = await findAllDriversService.execute();

    return response.json(drivers);
  }
}
