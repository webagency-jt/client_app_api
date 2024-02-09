import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { UserController } from './user';
import { inject, injectable, named } from 'inversify';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { PostsController } from './posts';
import * as hono from 'hono';
import { NotificationsController } from './notifications';
import { Controller } from '@libs/decorators/controller';
import { isContextDefined } from '@libs/core/helpers/context';
import { App } from '@libs/core/server';

export interface IController {
  // Where root will be loaded
  setup(ctx?: hono.Context): any;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.posts) private postsController: PostsController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user) private userController: UserController,
    // eslint-disable-next-line max-len
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.notifications) private notificationsController: NotificationsController,
  ) { }

  public setup(): void {
    this.helloWorld();
    this.userController.setup();
    this.postsController.setup();
    this.notificationsController.setup();
  }


  @Controller({
    method: 'get',
    path: '/',
  })
  private helloWorld(ctx?: hono.Context): unknown {
    isContextDefined(ctx);
    if (ctx) {
      return ctx.json('Hello world, back is working fine');
    };
  }
}
