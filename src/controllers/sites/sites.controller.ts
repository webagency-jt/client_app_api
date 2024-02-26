import * as hono from 'hono';
import { IController } from '..';
import { Get, Post, Put } from '@libs/core/decorators/parameters.decorator';
import { SitesService } from '@libs/sites/sites.service';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { Prisma } from '@prisma/client';
import { Guards } from '@libs/core/decorators/guard.decorator';
import { AdminGuard } from '@libs/guards/admin.guard';
import { AuthorizationSchema } from '@libs/schemas/header.schema';
import { SitesInputSchema } from '@libs/sites/sites.schema';

@injectable()
export class SitesController implements IController {

  constructor(
    private readonly sitesService: SitesService,
  ) { }

  public setup(): void {
    this.createSites();
    this.getSite();
    this.updateSites();
  }

  @Post({
    path: '/sites',
    request: {
      headers: AuthorizationSchema,
      body: {
        content: {
          'application/json': {
            schema: SitesInputSchema,
          },
        },
      },
    },
    responses: {},
  })
  @Guards(AdminGuard)
  private async createSites(ctx?: hono.Context) {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as Prisma.SitesUncheckedCreateInput;
      const siteCreated = await this.sitesService.create(body);
      return ctx.json(siteCreated);
    };
  }

  @Put({
    path: '/sites',
    request: {
      headers: AuthorizationSchema,
      body: {
        content: {
          'application/json': {
            schema: SitesInputSchema,
          },
        },
      },
    },
    responses: {},
  })
  @Guards(AdminGuard)
  private async updateSites(ctx?: hono.Context) {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as Prisma.SitesUncheckedUpdateInput;
      const siteCreated = await this.sitesService.update(body);
      return ctx.json(siteCreated);
    };
  }

  @Get({
    path: '/sites/{sitesId}',
    request: {
      headers: AuthorizationSchema,
    },
    responses: {},
  })
  private async getSite(ctx?: hono.Context) {
    isContextDefined(ctx);
    if (ctx) {
      const { sitesId } = ctx.req.param();
      const siteFound = await this.sitesService.get(sitesId);
      return ctx.json(siteFound);
    };
  }
}
