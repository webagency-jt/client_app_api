import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { injectable, inject, named } from 'inversify';
import { IController } from '..';
import { UserSettingsController } from './user-settings.controller';
import { UserController } from './user.controller';

@injectable()
export class UsersRootController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user) private userController: UserController,
    @inject(SERVICE_IDENTIFIER.Controller) @named(SERVICE_NAME.controllers.user_settings) private userSettingsController: UserSettingsController,
  ) { }

  public setup(): void {
    this.userSettingsController.setup();
    this.userController.setup();
  }
}
