import { IPagination } from '@libs/core/interfaces/pagination.interface';
import { AppOrm } from '@libs/core/orm/orm';
import { TypeguardUtils } from '@libs/utils/typeguard';
import { Prisma, Sites } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class SitesRepository {

  constructor(
    private readonly orm: AppOrm,
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

  public async findUnique(siteId: string): Promise<Sites | null> {
    try {
      return this.orm.client.sites.findUnique({
        where: {
          id: siteId,
        },
      });
    } catch (e: unknown) {
      throw e;
    }
  }

  public async deleteOne(siteId: string): Promise<Sites | null> {
    try {
      return this.orm.client.sites.delete({
        where: {
          id: siteId,
        },
      });
    } catch (e: unknown) {
      throw e;
    }
  }

  public async findMany(userId: string, pagination: IPagination): Promise<Sites[] | null> {
    try {
      return this.orm.client.sites.findMany({
        where: {
          userId
        },
        skip: pagination.skip,
        take: pagination.take,
      });
    } catch (e: unknown) {
      throw e;
    }
  }
}
