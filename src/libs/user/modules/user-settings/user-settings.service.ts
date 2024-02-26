import { HttpErrors } from '@libs/errors/https-errors';
import { Prisma, UserSettings } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserRepository } from '@libs/user/user.repository';
import { UserSettingsRepository } from './user-settings.repository';
import { injectable } from 'inversify';

@injectable()
export class UserSettingsService {

  public constructor(
    public readonly userRepository: UserRepository,
    public readonly userSettingsRepository: UserSettingsRepository,
  ) { }

  public async update(userSettingsInput: Prisma.UserSettingsUncheckedCreateInput): Promise<UserSettings> {
    const userFound = await this.userRepository.findUniqueById(userSettingsInput.userId);
    if (userFound) {
      return this.userSettingsRepository.upsert(userSettingsInput);
    }

    throw new HttpErrors(`User with id: '${userSettingsInput.userId}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
  }
}
