import { FindDriverByNameService } from "@modules/driver/services/FindDriverByNameService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindDriverByNameController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { name } = request.params;

    const findDriverByNameService = container.resolve(FindDriverByNameService);

    const drivers = await findDriverByNameService.execute(name);

    return response.json(drivers);
  }
}
