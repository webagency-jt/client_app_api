import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppOrm } from '@libs/core/orm';
import { inject, injectable } from 'inversify';
import { IUser, IUserInput } from '.';

@injectable()
export class UserRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async create(user: IUserInput): Promise<IUser> {
    try {
      const userCreated: IUser = await this.orm.client.user.create({
        data: {
          email: user.email,
          username: user.username,
          password: user.password,
        },
      });

      return userCreated;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
