import { IController } from '..';
import { injectable } from 'inversify';
import { UserService } from '@libs/user/user.service';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context.helper';
import { UserUsername, userUsernameSchema } from '@libs/schemas/username.schema';
import { Get, Post } from '@libs/core/decorators/parameters.decorator';
import { AuthorizationSchema } from '@libs/schemas/header.schema';

// Lien de la documentation de openapi validation: https://github.com/asteasolutions/zod-to-openapi#defining-custom-components
@injectable()
export class UserController implements IController {
  public constructor(
    private readonly userService: UserService,
  ) { }


  public setup(): any {
    this.exist();
    this.me();
  }

  @Get({
    path: '/users/me',
    secureRoute: true,
    request: {
      headers: AuthorizationSchema,
    },
    responses: {},
  })
  private me(ctx?: hono.Context): unknown {
    isContextDefined(ctx);
    if (ctx) {
      const me = ctx.get('jwtPayload');
      return ctx.json({ me });
    };
  }

  @Post({
    path: '/users/exist',
    request: {
      headers: AuthorizationSchema,
      body: {
        content: {
          'application/json': {
            schema: userUsernameSchema,
          },
        },
      },
    },
    responses: {},
  })
  private async exist(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as UserUsername;
      const userExist = await this.userService.exist(body);
      return ctx.json({ userExist });
    };
  }
}
