import { injectable } from 'inversify';
import { IController } from '..';
import { UserSettingsController } from './user-settings.controller';
import { UserController } from './user.controller';
import { UserInformationsController } from './user-informations.controller';
import { App } from '@libs/core/server/server';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';

@injectable()
export class UsersRootController implements IController {
  public constructor(
    private readonly server: App,
    private readonly userController: UserController,
    private readonly userSettingsController: UserSettingsController,
    private readonly userInformationsController: UserInformationsController,
    private readonly jwtMiddleware: JwtMiddleware,
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
