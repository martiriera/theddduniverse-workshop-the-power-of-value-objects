import { AdvertisementRepository } from "../../domain/AdvertisementRepository";
import { Advertisement } from "../../domain/model/Advertisement";
import { Password } from "../../domain/model/Password";
import { PublishAdvertisementCommand } from "./PublishAdvertisementCommand";

export class PublishAdvertisementUseCase {

  constructor(
    private advertisementRepository: AdvertisementRepository
  ) {

  }

  async execute(command: PublishAdvertisementCommand): Promise<void> {
    const password = await Password.createFromPlain(command.password);
    const advertisement = new Advertisement(
      command.id,
      command.description,
      password,
      new Date()
    );

    await this.advertisementRepository.save(advertisement)

  }

}
