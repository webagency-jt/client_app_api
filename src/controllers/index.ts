import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller.decorator';
import { NotificationsController } from './notifications/notifications.controller';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { AuthController } from './auth/auth.controller';
import { UsersRootController } from './user';
import { Get } from '@libs/core/decorators/controller.decorator';

export interface IController {
  // Where root will be loaded
  setup(ctx?: hono.Context): any;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    private readonly server: App,
    private readonly usersRootController: UsersRootController,
    private readonly authController: AuthController,
    private readonly notificationsController: NotificationsController,
  ) { }

  public setup(): void {
    this.helloWorld();
    this.authController.setup();
    this.notificationsController.setup();
    this.usersRootController.setup();
    this.test();
  }

  @Get({
    path: '/cc',
    responses: {},
  })
  public test(ctx?: hono.Context) {
    if (ctx) {
      return ctx.json({
        salut: 'mathys',
      });
    }
  }

  @Get({
    path: '/',
    responses: {},
  })
  private helloWorld(ctx?: hono.Context): unknown {
    isContextDefined(ctx);
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    };
  }
}
