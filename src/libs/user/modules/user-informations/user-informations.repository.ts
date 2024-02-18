import { AppOrm } from '@libs/core/orm/orm';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable } from 'inversify';
import { Prisma, UserInformations } from '@prisma/client';
import { TypeguardUtils } from '@libs/utils/typeguard';

@injectable()
export class UserInformationsRepository {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Orm) public orm: AppOrm,
  ) { }

  public async findUnique(userId: string): Promise<UserInformations | null> {
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

  public async create(userInformationsInput: Prisma.UserInformationsUncheckedCreateInput): Promise<UserInformations> {
    try {
      return this.orm.client.userInformations.create({
        data: userInformationsInput,
      });
    } catch (e: unknown) {
      throw e;
    }
  }

  public async update(userInformationsInput: Prisma.UserInformationsUncheckedUpdateInput): Promise<UserInformations> {
    try {
      const userId = userInformationsInput.userId;
      if (TypeguardUtils.isStringGuard(userId)) {
        return this.orm.client.userInformations.update({
          where: {
            userId,
          },
          data: userInformationsInput,
        });
      } else {
        throw new Error(`userId is not a string: ${typeof userId}, ${userId}`);
      }
    } catch (e: unknown) {
      throw e;
    }
  }
}
