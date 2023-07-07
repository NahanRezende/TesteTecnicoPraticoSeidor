import { UpdateDriverService } from "@modules/driver/services/UpdateDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class UpdateDriverController {
  async handle(request: Request, response: Response): Promise<Response>{
    const driver = request.body;

    const updateDriverService = container.resolve(UpdateDriverService);

    const updatedDriver = await updateDriverService.execute(driver);

    return response.json(updatedDriver);
  }
}
