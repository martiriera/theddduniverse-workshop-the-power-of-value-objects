import { AdvertisementRepository } from "../../domain/AdvertisementRepository"
import { Password } from "../../domain/model/Password";
import { RenewAdvertisementCommand } from "./RenewAdvertisementCommand"

export class RenewAdvertisementUseCase {

  constructor(
    private advertisementRepository: AdvertisementRepository
  ) {

  }

  async execute(command: RenewAdvertisementCommand): Promise<void> {
    const advertisement = await this.advertisementRepository.findById(command.id);
    const isValidPassword = await advertisement.password().isVerifiedBy(command.password);
    if(!isValidPassword) {
      return;
    }

    advertisement.renew(await Password.createFromPlain(command.password))

    await this.advertisementRepository.save(advertisement)
  }
}
