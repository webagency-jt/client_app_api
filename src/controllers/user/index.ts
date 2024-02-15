import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { injectable, inject, named } from 'inversify';
import { IController } from '..';
import { UserSettingsController } from './user-settings.controller';
import { UserController } from './user.controller';
import { UserInformationsController } from './user-informations.controller';
import { App } from '@libs/core/server/server';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';

@injectable()
export class UsersRootController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user) private userController: UserController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user_settings) private userSettingsController: UserSettingsController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user_informations) private userInformationsController: UserInformationsController,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.middleware.jwt_middleware) private jwtMiddleware: JwtMiddleware,
  ) { }

  public setup(): void {
    this.server.hono.use(
      '/users/*',
      this.jwtMiddleware.get(),
    );
    this.userSettingsController.setup();
    this.userController.setup();
    this.userInformationsController.setup();
  }
}
