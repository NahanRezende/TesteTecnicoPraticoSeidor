import { FindCarByIdService } from "@modules/car/services/FindCarByIdService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarByIdController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { car_id } = request.params;

    const findCarByIdService = container.resolve(FindCarByIdService);

    const car = await findCarByIdService.execute(car_id);

    return response.json(car);
  }
}
