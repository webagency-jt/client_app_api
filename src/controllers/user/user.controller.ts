import { App } from '@libs/core/server/server';
import { IController } from '..';
import { injectable } from 'inversify';
import { UserService } from '@libs/user/user.service';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';
import { UserUsername, userUsernameSchema } from '@libs/schemas/user-email.schema';
import { AdminGuard } from '@libs/guards/admin.guard';
import { Post } from '@libs/core/decorators/controller.decorator';

// Lien de la documentation de openapi validation: https://github.com/asteasolutions/zod-to-openapi#defining-custom-components
@injectable()
export class UserController implements IController {
  public constructor(
    private readonly server: App,
    private readonly userService: UserService,
    private readonly adminGuard: AdminGuard,
  ) { }


  public setup(): any {
    this.exist();
  }

  @Post({
    path: '/users/exist',
    request: {
      body: {
        content: {
          'application/json': {
            schema: userUsernameSchema,
          },
        },
      },
    },
    responses: {},
    guards: [],
  })
  private async exist(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as UserUsername;
      const payload = ctx.get('jwtPayload');
      const updatedSettings = await this.userService.exist(body);
      return ctx.json({ updatedSettings, payload });
    };
  }

}
