import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { NotificationsController } from './notifications/notifications.controller';
import { PostsController } from './posts/posts.controller';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserController } from './user/user.controller';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';

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
