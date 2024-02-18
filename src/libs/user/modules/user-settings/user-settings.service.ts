import { HttpErrors } from '@libs/errors/https-errors';
import { Prisma, UserSettings } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserRepository } from '@libs/user/user.repository';
import { UserSettingsRepository } from './user-settings.repository';
import { inject, injectable, named } from 'inversify';

@injectable()
export class UserSettingsService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) public userRepository: UserRepository,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_settings_repository) public userSettingsRepository: UserSettingsRepository,
  ) { }

  public async update(userSettingsInput: Prisma.UserSettingsUncheckedCreateInput): Promise<UserSettings> {
    const userFound = await this.userRepository.findUniqueById(userSettingsInput.userId);
    if (userFound) {
      return this.userSettingsRepository.upsert(userSettingsInput);
    }

    throw new HttpErrors(`User with id: '${userSettingsInput.userId}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
  }
}
