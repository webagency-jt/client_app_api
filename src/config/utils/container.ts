import { App } from '@libs/core/server/server';
import { AppLogger } from '@libs/core/logger/logger';
import { AppOrm } from '@libs/core/orm/orm';
import { AuthController } from '@controller/auth/auth.controller';
import { Config } from '@config/config';
import { Container } from 'inversify';
import { ControllerRoot } from '@controller/index';
import { NotificationsController } from '@controller/notifications/notifications.controller';
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
import { SitesController } from '@controller/sites/sites.controller';
import { SitesRootController } from '@controller/sites';

/**
 * learning scopes
 * @link https://www.c-sharpcorner.com/article/differences-between-scoped-transient-and-singleton-service/
 */
export function bindContainer(container: Container): void {
  /* #region Singleton Class */
  container.bind(App).toSelf().inSingletonScope();
  container.bind(Config).toSelf().inSingletonScope();
  container.bind(AppLogger).toSelf().inSingletonScope();
  container.bind(AppOrm).toSelf().inSingletonScope();
  container.bind(JwtMiddleware).toSelf().inRequestScope();
  /* #endregion */

  /* #region Libs */
  container.bind(UserRepository).toSelf()
    .inRequestScope();
  container.bind(UserService).toSelf()
    .inRequestScope();
  container.bind(UserSettingsRepository).toSelf()
    .inRequestScope();
  container.bind(UserSettingsService).toSelf()
    .inRequestScope();
  container.bind(UserInformationsRepository).toSelf()
    .inRequestScope();
  container.bind(UserInformationsService).toSelf()
    .inRequestScope();
  container.bind(SitesRepository).toSelf()
    .inRequestScope();
  container.bind(SitesService).toSelf()
    .inRequestScope();
  /* #endregion */

  /* #region Guards */
  container.bind(AdminGuard).toSelf()
    .inRequestScope();
  /* #endregion */

  /* #region Controller */
  container.bind(ControllerRoot).toSelf()
    .inRequestScope();
  container.bind(UserController).toSelf()
    .inRequestScope();
  container.bind(NotificationsController).toSelf()
    .inRequestScope();
  container.bind(AuthController).toSelf()
    .inRequestScope();
  container.bind(UsersRootController).toSelf()
    .inRequestScope();
  container.bind(UserSettingsController).toSelf()
    .inRequestScope();
  container.bind(UserInformationsController).toSelf()
    .inRequestScope();
  container.bind(SitesRootController).toSelf()
    .inRequestScope();
  container.bind(SitesController).toSelf()
    .inRequestScope();
  /* #endregion */
}
