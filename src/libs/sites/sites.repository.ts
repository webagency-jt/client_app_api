import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { AppOrm } from '@libs/core/orm/orm';
import { TypeguardUtils } from '@libs/utils/typeguard';
import { Prisma, Sites } from '@prisma/client';
import { inject, injectable } from 'inversify';

@injectable()
export class SitesRepository {

  constructor(
    @inject(SERVICE_IDENTIFIER.Orm) private orm: AppOrm,
  ) { }

  public async create(siteInput: Prisma.SitesUncheckedCreateInput): Promise<Sites> {
    try {
      return this.orm.client.sites.create({
        data: siteInput,
      });
    } catch (e) {
      throw e;
    }
  }

  public async update(siteInput: Prisma.SitesUncheckedUpdateInput): Promise<Sites> {
    try {
      const siteId = siteInput.userId;
      if (TypeguardUtils.isString(siteId)) {
        return this.orm.client.sites.update({
          where: {
            id: siteId,
          },
          data: siteInput,
        });
      } else {
        throw new Error(`userId is not a string: ${typeof siteId}, ${siteId}`);
      }
    } catch (e) {
      throw e;
    }
  }

}
