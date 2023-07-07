import { FindAllCarsService } from "@modules/car/services/FindAllCarsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindAllCarsController {
  async handle(request: Request, response: Response): Promise<Response>{
    const findAllCarsService = container.resolve(FindAllCarsService);

    const cars = await findAllCarsService.execute();

    return response.json(cars);
  }
}
