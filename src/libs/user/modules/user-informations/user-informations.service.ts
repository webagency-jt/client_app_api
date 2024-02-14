import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable, named } from 'inversify';
import { UserInformationsRepository } from './user-informations.repository';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { IUserInformations } from './user-informations.interface';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@injectable()
export class UserInformationsService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_informations_repository) private userInformationsRepository: UserInformationsRepository,
  ) { }

  public async create(userInformationsInput: IUserInformations): Promise<IUserInformations> {
    const found = await this.userInformationsRepository.findUnique(userInformationsInput.userId);
    if (!found) {
      return this.userInformationsRepository.create(userInformationsInput);
    } else {
      throw new HttpErrors(ReasonPhrases.CONFLICT, StatusCodes.CONFLICT);
    }
  }

  public async update(userInformationsInput: Partial<IUserInformations>): Promise<IUserInformations> {
    return this.userInformationsRepository.update(userInformationsInput);
  }
}
