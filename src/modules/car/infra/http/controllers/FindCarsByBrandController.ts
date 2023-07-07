import { FindCarsByBrandService } from "@modules/car/services/FindCarsByBrandService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class FindCarsByBrandController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { brand } = request.params;

    const findCarsByBrandService = container.resolve(FindCarsByBrandService);

    const cars = await findCarsByBrandService.execute(brand);

    return response.json(cars);
  }
}
