import { AppOrm } from '@libs/core/orm/orm';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable } from 'inversify';
import { IUserInformations } from './user-informations.interface';

@injectable()
export class UserInformationsRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async findUnique(userId: string): Promise<IUserInformations | null> {
    try {
      return this.orm.client.userInformations.findUnique({
        where: {
          userId,
        },
      });
    } catch (e: unknown) {
      throw e;
    }
  }

  public async create(userInformationsInput: IUserInformations): Promise<IUserInformations> {
    try {
      return this.orm.client.userInformations.create({
        data: userInformationsInput,
      });
    } catch (e: unknown) {
      throw e;
    }
  }

  public async update(userInformationsInput: Partial<IUserInformations>): Promise<IUserInformations> {
    try {
      return this.orm.client.userInformations.update({
        where: {
          userId: userInformationsInput.userId,
        },
        data: userInformationsInput,
      });
    } catch (e: unknown) {
      throw e;
    }
  }
}
