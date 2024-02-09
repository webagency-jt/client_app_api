import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppOrm } from '@libs/core/orm/orm';
import { inject, injectable } from 'inversify';
import { IUserInput, IUser } from './user.interface';

// TODO: voir pour utiliser ça pour authentifier le user : https://github.com/nextauthjs/next-auth
// TODO: faire une fonction pour mapper les codes erreurs prisma
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
    } catch (e: unknown) {
      throw e;
    }
  }
}
