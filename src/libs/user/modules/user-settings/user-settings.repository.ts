import { AppOrm } from '@libs/core/orm/orm';
import { IUserSettingsInput, IUserSettings } from './user-settings.interface';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable } from 'inversify';

@injectable()
export class UserSettingsRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async upsert(userSettingsInput: IUserSettingsInput): Promise<IUserSettings> {
    try {
      return this.orm.client.userSettings.upsert({
        where: {
          userId: userSettingsInput.userId,
        },
        update: {
          lang: userSettingsInput.lang,
        },
        create: {
          userId: userSettingsInput.userId,
          lang: userSettingsInput.lang,
        },
      });
    } catch (e: unknown) {
      throw e;
    }
  }

}
