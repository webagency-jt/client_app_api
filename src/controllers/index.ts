import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { UserController } from './user';
import { inject, injectable, named } from 'inversify';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { PostsController } from './posts';
import * as hono from 'hono';
import { NotificationsController } from './notifications';

export interface IController {
  // Where root will be loaded
  setup(ctx?: hono.Context): any;
}

@injectable()
export class ControllerRoot implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.posts) private postsController: PostsController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user) private userController: UserController,
    // eslint-disable-next-line max-len
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.notifications) private notificationsController: NotificationsController,
  ) { }

  public setup(): void {
    this.userController.setup();
    this.postsController.setup();
    this.notificationsController.setup();
  }
}
