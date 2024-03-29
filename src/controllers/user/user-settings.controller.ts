import * as hono from 'hono';
import { IController } from '..';
import { Prisma } from '@prisma/client';
import { UserSettingsInputSchema, UserSettingsSchema } from '@libs/user/modules/user-settings/user-settings.schema';
import { UserSettingsService } from '@libs/user/modules/user-settings/user-settings.service';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context.helper';
import { Patch } from '@libs/core/decorators/parameters.decorator';
import { AuthorizationSchema } from '@libs/schemas/header.schema';

@injectable()
export class UserSettingsController implements IController {
  public constructor(
    private readonly userSettingsService: UserSettingsService,
  ) { }

  public setup(): any {
    this.updateSettings();
  }

  @Patch({
    path: '/users/settings',
    tags: ['Users Settings'],
    secureRoute: true,
    request: {
      headers: AuthorizationSchema,
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
        description: 'todo',
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
