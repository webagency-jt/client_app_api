import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller.decorator';
import { NotificationsController } from './notifications/notifications.controller';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { AuthController } from './auth/auth.controller';
import { UsersRootController } from './user';
import { ControllerTest } from '@libs/core/decorators/controller.decorator';
import { Get } from '@libs/core/decorators/request.decorator';
import { Request } from '@libs/core/decorators/context.decorator';

export interface IController {
  // Where root will be loaded
  setup(ctx?: hono.Context): any;
}

@injectable()
@ControllerTest()
export class ControllerRoot implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user_root) private usersRootController: UsersRootController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.auth) private authController: AuthController,
    // eslint-disable-next-line max-len
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.notifications) private notificationsController: NotificationsController,
  ) { }

  public setup(): void {
    this.helloWorld();
    this.authController.setup();
    this.notificationsController.setup();
    this.usersRootController.setup();
    this.test();
  }

  @Controller({
    method: 'get',
    path: '/cc',
    responses: {},
  })
  public test(ctx?: hono.Context, @Request() test?: any) {
    console.log('test', test);

    if (ctx) {
      return ctx.json('cc');
    };

  }

  @Controller({
    method: 'get',
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
