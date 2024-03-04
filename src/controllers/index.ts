import * as hono from 'hono';
import { NotificationsController } from './notifications/notifications.controller';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context.helper';
import { AuthController } from './auth/auth.controller';
import { UsersRootController } from './user';
import { Get } from '@libs/core/decorators/parameters.decorator';
import { SitesRootController } from './sites';

export interface IController {
  // Where root will be loaded
  setup(): any;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    private readonly authController: AuthController,
    private readonly notificationsController: NotificationsController,
    private readonly sitesRootController: SitesRootController,
    private readonly usersRootController: UsersRootController,
  ) { }

  public setup(): void {
    this.helloWorld();
    this.authController.setup();
    this.notificationsController.setup();
    this.sitesRootController.setup();
    this.usersRootController.setup();
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
