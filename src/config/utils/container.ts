import { App } from '@libs/core/server/server';
import { AppLogger } from '@libs/core/logger/logger';
import { AppOrm } from '@libs/core/orm/orm';
import { AuthController } from '@controller/auth/auth.controller';
import { Config } from '@config/config';
import { Container } from 'inversify';
import { ControllerRoot } from '@controller/index';
import { NotificationsController } from '@controller/notifications/notifications.controller';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserController } from '@controller/user/user.controller';
import { UserRepository } from '@libs/user/user.repository';
import { UserService } from '@libs/user/user.service';
import { UserSettingsRepository } from '@libs/user/modules/user-settings/user-settings.repository';
import { UserSettingsService } from '@libs/user/modules/user-settings/user-settings.service';
import { UsersRootController } from '@controller/user';
import { UserSettingsController } from '@controller/user/user-settings.controller';
import { UserInformationsRepository } from '@libs/user/modules/user-informations/user-informations.repository';
import { UserInformationsService } from '@libs/user/modules/user-informations/user-informations.service';
import { UserInformationsController } from '@controller/user/user-informations.controller';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';
import { SitesRepository } from '@libs/sites/sites.repository';
import { SitesService } from '@libs/sites/sites.service';
import { AdminGuard } from '@libs/guards/admin.guard';

export function bindContainer(container: Container): void {
  /* #region Singleton Class */
  container.bind(SERVICE_IDENTIFIER.App).to(App).inSingletonScope();
  container.bind(SERVICE_IDENTIFIER.Config).to(Config).inSingletonScope();
  container.bind(SERVICE_IDENTIFIER.Logger).to(AppLogger).inSingletonScope();
  container.bind(SERVICE_IDENTIFIER.Orm).to(AppOrm).inSingletonScope();
  container.bind(SERVICE_IDENTIFIER.Libs).to(JwtMiddleware).inSingletonScope()
    .whenTargetNamed(SERVICE_NAME.middleware.jwt_middleware);
  /* #endregion */

  /* #region Libs */
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserRepository)
    .whenTargetNamed(SERVICE_NAME.libs.user_repository);
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserService)
    .whenTargetNamed(SERVICE_NAME.libs.user_service);
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserSettingsRepository)
    .whenTargetNamed(SERVICE_NAME.libs.user_settings_repository);
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserSettingsService)
    .whenTargetNamed(SERVICE_NAME.libs.user_settings_service);
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserInformationsRepository)
    .whenTargetNamed(SERVICE_NAME.libs.user_informations_repository);
  container.bind(SERVICE_IDENTIFIER.Libs).to(UserInformationsService)
    .whenTargetNamed(SERVICE_NAME.libs.user_informations_service);
  container.bind(SERVICE_IDENTIFIER.Libs).to(SitesRepository)
    .whenTargetNamed(SERVICE_NAME.libs.site_repository);
  container.bind(SERVICE_IDENTIFIER.Libs).to(SitesService)
    .whenTargetNamed(SERVICE_NAME.libs.site_service);
  /* #endregion */

  /* #region Guards */
  container.bind(SERVICE_IDENTIFIER.Guards).to(AdminGuard).inSingletonScope()
    .whenTargetNamed(SERVICE_NAME.guards.admin);
  /* #endregion */

  /* #region Controller */
  container.bind(SERVICE_IDENTIFIER.Controller).to(ControllerRoot)
    .whenTargetNamed(SERVICE_NAME.controllers.root);
  container.bind(SERVICE_IDENTIFIER.Controller).to(UserController)
    .whenTargetNamed(SERVICE_NAME.controllers.user);
  container.bind(SERVICE_IDENTIFIER.Controller).to(NotificationsController)
    .whenTargetNamed(SERVICE_NAME.controllers.notifications);
  container.bind(SERVICE_IDENTIFIER.Controller).to(AuthController)
    .whenTargetNamed(SERVICE_NAME.controllers.auth);
  container.bind(SERVICE_IDENTIFIER.Controller).to(UsersRootController)
    .whenTargetNamed(SERVICE_NAME.controllers.user_root);
  container.bind(SERVICE_IDENTIFIER.Controller).to(UserSettingsController)
    .whenTargetNamed(SERVICE_NAME.controllers.user_settings);
  container.bind(SERVICE_IDENTIFIER.Controller).to(UserInformationsController)
    .whenTargetNamed(SERVICE_NAME.controllers.user_informations);
  /* #endregion */
}
