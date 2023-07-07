import { DeleteCarService } from "@modules/car/services/DeleteCarService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteCarController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { car_id } = request.params;

    const deleteCarService = container.resolve(DeleteCarService);

    await deleteCarService.execute(car_id);

    return response.status(200).send();
  }
}
