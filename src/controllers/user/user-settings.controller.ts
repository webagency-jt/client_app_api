import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller.decorator';
import { IController } from '..';
import { Prisma } from '@prisma/client';
import { UserSettingsInputSchema, UserSettingsSchema } from '@libs/user/modules/user-settings/user-settings.schema';
import { UserSettingsService } from '@libs/user/modules/user-settings/user-settings.service';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';

@injectable()
export class UserSettingsController implements IController {
  public constructor(
    private readonly server: App,
    private readonly userSettingsService: UserSettingsService,
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
      const body = await ctx.req.json() as Prisma.UserSettingsUncheckedCreateInput;
      const updatedSettings = await this.userSettingsService.update(body);
      return ctx.json(updatedSettings);
    };
  }
}
