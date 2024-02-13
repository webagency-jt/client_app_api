import { AppOrm } from '@libs/core/orm/orm';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable } from 'inversify';
import { IUserInformations } from './user-informations.interface';

@injectable()
export class UserInformationsRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async upsert(userInformationsInput: IUserInformations): Promise<IUserInformations> {
    try {
      return this.orm.client.userInformations.upsert({
        where: {
          userId: userSettingsInput.userId,
        },
        update: {
          address: '',
          city: '',
          firstname: '',
          lastname: '',
          phoneNumber: '',
          siret: '',
          state: '',
          tva: 1,
          userId: '',
          zip: '',
        },
        create: {

        },
      });
    } catch (e: unknown) {
      throw e;
    }
  }

}
