import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable, named } from 'inversify';
import { IUserSettings, IUserSettingsInput } from './user-settings.interface';
import { UserSettingsRepository } from './user-settings.repository';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserRepository } from '@libs/user/user.repository';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

@injectable()
export class UserSettingsService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) public userRepository: UserRepository,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_settings_repository) public userSettingsRepository: UserSettingsRepository,
  ) { }

  public async update(userSettingsInput: IUserSettingsInput): Promise<IUserSettings> {
    const userFound = await this.userRepository.findUniqueById(userSettingsInput.userId);
    if (userFound) {
      return this.userSettingsRepository.upsert(userSettingsInput);
    }

    throw new HttpErrors(`User with id: '${userSettingsInput.userId}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
  }
}
