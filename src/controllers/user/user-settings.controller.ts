import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { IUserSettingsInput } from '@libs/user/modules/user-settings/user-settings.interface';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserSettingsInputSchema, UserSettingsSchema } from '@libs/user/modules/user-settings/user-settings.schema';
import { UserSettingsRepository } from '@libs/user/modules/user-settings/user-settings.repository';
import { UserSettingsService } from '@libs/user/modules/user-settings/user-settings.service';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';

@injectable()
export class UserSettingsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_settings_service) private userSettingsService: UserSettingsService,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_settings_repository) private userSettingsRepository: UserSettingsRepository,
  ) { }

  public setup(): any {
    this.updateSettings();
  }


  @Controller({
    method: 'patch',
    path: '/users/settings',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserSettingsInputSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserSettingsSchema,
          },
        },
      },
    },
  })
  private async updateSettings(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserSettingsInput;
      const updatedSettings = await this.userSettingsService.update(body);
      return ctx.json(updatedSettings);
    };
  }
}
