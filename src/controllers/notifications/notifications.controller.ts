import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { IController } from '..';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { z } from 'zod';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';
import { Get } from '@libs/core/decorators/parameters.decorator';

@injectable()
export class NotificationsController implements IController {
  public constructor(
    private readonly server: App,
    private readonly jwtMiddleware: JwtMiddleware,
  ) { }

  public setup(): void {
    this.server.hono.use(
      '/notifications/*',
      this.jwtMiddleware.get(),
    );
    this.getNotification();
  }

  @Get({
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

