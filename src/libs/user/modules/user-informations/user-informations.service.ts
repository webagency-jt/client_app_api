import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable, named } from 'inversify';
import { UserInformationsRepository } from './user-informations.repository';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Prisma, UserInformations } from '@prisma/client';

@injectable()
export class UserInformationsService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_informations_repository) private userInformationsRepository: UserInformationsRepository,
  ) { }

  public async create(userInformationsInput: Prisma.UserInformationsUncheckedCreateInput): Promise<UserInformations> {
    const found = await this.userInformationsRepository.findUnique(userInformationsInput.userId);
    if (!found) {
      return this.userInformationsRepository.create(userInformationsInput);
    } else {
      throw new HttpErrors(ReasonPhrases.CONFLICT, StatusCodes.CONFLICT);
    }
  }

  public async findUnique(userId: string): Promise<UserInformations | null> {
    return this.userInformationsRepository.findUnique(userId);
  }

  public async update(userInformationsInput: Prisma.UserInformationsUncheckedUpdateInput): Promise<UserInformations> {
    return this.userInformationsRepository.update(userInformationsInput);
  }
}
