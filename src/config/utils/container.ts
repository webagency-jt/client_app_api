import { Config } from '@config/config';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { ControllerRoot } from '@controller/index';
import { NotificationsController } from '@controller/notifications/notifications.controller';
import { PostsController } from '@controller/posts/posts.controller';
import { UserController } from '@controller/user/user.controller';
import { AppLogger } from '@libs/core/logger/logger';
import { AppOrm } from '@libs/core/orm/orm';
import { App } from '@libs/core/server/server';
import { UserRepository } from '@libs/user/user.repository';
import { Container } from 'inversify';

export function bindContainer(container: Container): void {
  /* #region Singleton Class */
  container.bind<App>(SERVICE_IDENTIFIER.App).to(App).inSingletonScope();
  container.bind<Config>(SERVICE_IDENTIFIER.Config).to(Config).inSingletonScope();
  container.bind<AppLogger>(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
  container.bind<AppOrm>(SERVICE_IDENTIFIER.Orm).to(AppOrm).inSingletonScope();
  /* #endregion */

  /* #region Libs */
  container.bind<UserRepository>(SERVICE_IDENTIFIER.Libs).to(UserRepository).inSingletonScope()
    .whenTargetNamed(SERVICE_NAME.libs.user_repository);
  /* #endregion */

  /* #region Controller */
  container.bind<ControllerRoot>(SERVICE_IDENTIFIER.Controller).to(ControllerRoot)
    .whenTargetNamed(SERVICE_NAME.controllers.root);
  container.bind<UserController>(SERVICE_IDENTIFIER.Controller).to(UserController)
    .whenTargetNamed(SERVICE_NAME.controllers.user);
  container.bind<PostsController>(SERVICE_IDENTIFIER.Controller).to(PostsController)
    .whenTargetNamed(SERVICE_NAME.controllers.posts);
  container.bind<NotificationsController>(SERVICE_IDENTIFIER.Controller).to(NotificationsController)
    .whenTargetNamed(SERVICE_NAME.controllers.notifications);
  /* #endregion */
}
