import { DefaultArgs } from '@prisma/client/runtime/library';
import { Prisma, PrismaClient } from '@prisma/client';
import { injectable } from 'inversify';

@injectable()
export class AppOrm {
  private _client = new PrismaClient();

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  get client() {
    return this._client;
  }
}
