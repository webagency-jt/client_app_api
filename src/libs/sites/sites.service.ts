import { Prisma, Sites } from '@prisma/client';
import { injectable } from 'inversify';
import { SitesRepository } from './sites.repository';
import { IPagination } from '@libs/core/interfaces/pagination.interface';

@injectable()
export class SitesService {

  constructor(
    private readonly sitesRepository: SitesRepository,
  ) { }

  public async create(site: Prisma.SitesUncheckedCreateInput): Promise<Sites> {
    return this.sitesRepository.create(site);
  }

  public async update(site: Prisma.SitesUncheckedUpdateInput): Promise<Sites> {
    return this.sitesRepository.update(site);
  }

  public async findUnique(siteId: string): Promise<Sites | null> {
    return this.sitesRepository.findUnique(siteId);
  }

  public async delete(siteId: string): Promise<Sites | null> {
    return this.sitesRepository.deleteOne(siteId);
  }

  public async get(pagination: IPagination): Promise<Sites[] | null> {
    return this.sitesRepository.findMany(pagination);
  }
}
