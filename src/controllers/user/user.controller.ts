import { App } from '@libs/core/server/server';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { injectable, inject, named } from 'inversify';
import { UserService } from '@libs/user/user.service';
import { Controller } from '@libs/decorators/controller';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';
import { IUserEmail, userEmailSchema } from '@libs/schemas/user-email.schema';

// Lien de la documentation de openapi validation: https://github.com/asteasolutions/zod-to-openapi#defining-custom-components
@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_service) private userService: UserService,
  ) { }


  public setup(): any {
    this.exist();
  }

  @Controller({
    method: 'post',
    path: '/users/exist',
    request: {
      body: {
        content: {
          'application/json': {
            schema: userEmailSchema,
          },
        },
      },
    },
  })
  private async exist(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserEmail;
      const updatedSettings = await this.userService.exist(body);
      return ctx.json(updatedSettings);
    };
  }

}
