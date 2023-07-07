import { FindCarsByColorService } from "@modules/car/services/FindCarsByColorService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarsByColorController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { color } = request.params;

    const findCarsByColorService = container.resolve(FindCarsByColorService);

    const cars = await findCarsByColorService.execute(color);

    return response.json(cars);
  }
}
