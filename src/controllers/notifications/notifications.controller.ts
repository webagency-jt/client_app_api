import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { injectable, inject } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { z } from 'zod';

@injectable()
export class NotificationsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
  ) { }

  @Controller({
    method: 'get',
    path: '/notifications',
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
  public setup(ctx?: hono.Context): any {
    isContextDefined(ctx);
    if (ctx) {
      return ctx.json({
        age: 20,
        name: 'body: hello',
      });
    };
  }

}

