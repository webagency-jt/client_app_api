import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppOrm } from '@libs/core/orm/orm';
import { inject, injectable } from 'inversify';
import { IUserCreateInput, IUser } from './user.interface';
import { User } from '@prisma/client';

// TODO: voir pour utiliser ça pour authentifier le user : https://github.com/nextauthjs/next-auth
@injectable()
export class UserRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async create(user: IUserCreateInput): Promise<IUser> {
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

  public async find(email: string): Promise<IUser | null> {
    return this.orm.client.user.findUnique({
      where: {
        email,
      },
    });
  }
}
