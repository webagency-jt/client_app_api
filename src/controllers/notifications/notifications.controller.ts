import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller.decorator';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { z } from 'zod';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';

@injectable()
export class NotificationsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.middleware.jwt_middleware) private jwtMiddleware: JwtMiddleware,
  ) { }

  public setup(): void {
    this.server.hono.use(
      '/notifications/*',
      this.jwtMiddleware.get(),
    );
    this.getNotification();
  }

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
  public getNotification(ctx?: hono.Context): any {
    isContextDefined(ctx);
    if (ctx) {
      return ctx.json({
        age: 20,
        name: 'body: hello',
      });
    };
  }

}

