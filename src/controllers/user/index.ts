import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { z } from '@hono/zod-openapi';
import { inject, injectable } from 'inversify';
import { IController } from '..';
import { App } from '@libs/core/server';
import { Controller } from '@libs/decorators/controller';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';
import { AppOrm } from '@libs/core/orm';
import { zValidator } from '@hono/zod-validator';

@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Orm) private orm: AppOrm,
  ) { }


  public setup(): any {
    this.create();
  }

  @Controller({
    method: 'post',
    path: '/user',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  })
  private async create(ctx?: hono.Context) {
    // TODO: ajouter la possibilite de valider les requêtes entrante
    const test = zValidator('json', {}, (result, c) => {
      if (!result.success) {
        return c.text('Invalid!', 400);
      }
    });

    isContextDefined(ctx);
    if (ctx) {
      const body: any = await ctx.req.raw.json();

      return ctx.json({
        age: 205,
        name: 'dslaut',
      });
    };
  }


}
