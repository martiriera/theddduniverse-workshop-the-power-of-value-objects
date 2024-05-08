import { AdvertisementRepository } from "../../domain/AdvertisementRepository"
import { Password } from "../../domain/model/Password";
import { UpdateAdvertisementCommand } from "./UpdateAdvertisementCommand"

export class UpdateAdvertisementUseCase {

  constructor(
    private advertisementRepository: AdvertisementRepository
  ) {

  }

  async execute(command: UpdateAdvertisementCommand): Promise<void> {
    const advertisement = await this.advertisementRepository.findById(command.id);
    const isValidPassword = await advertisement.password().isVerifiedBy(command.password);
    if (!isValidPassword) {
      return
    }

    advertisement.update(command.description, await Password.createFromPlain(command.password))

    await this.advertisementRepository.save(advertisement)
  }
}
