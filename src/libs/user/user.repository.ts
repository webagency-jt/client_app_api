import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppOrm } from '@libs/core/orm/orm';
import { inject, injectable } from 'inversify';
import { Prisma, User } from '@prisma/client';

@injectable()
export class UserRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async create(user: Prisma.UserCreateInput): Promise<User> {
    try {
      const userCreated = await this.orm.client.user.create({
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

  public async findUniqueByEmail(email: string): Promise<User | null> {
    return this.orm.client.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async findUniqueById(id: string): Promise<User | null> {
    return this.orm.client.user.findUnique({
      where: {
        id,
      },
    });
  }
}
