import { CreateDriverService } from "@modules/driver/services/CreateDriverService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export class CreateDriverController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { name } = request.body;

    const createDriverSerice = container.resolve(CreateDriverService);

    const driver = await createDriverSerice.execute(name);

    return response.json(driver);
  }
}
