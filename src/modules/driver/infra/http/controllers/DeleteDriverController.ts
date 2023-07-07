import { DeleteDriverService } from "@modules/driver/services/DeleteDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class DeleteDriverController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { driver_id } = request.params;

    const deleteDriverService = container.resolve(DeleteDriverService);

    await deleteDriverService.execute(driver_id);

    return response.status(200).send();
  }
}
