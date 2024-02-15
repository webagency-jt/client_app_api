import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { IUserCreateInput, IUserLoginInput } from '@libs/user/user.interface';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { StatusCodes } from 'http-status-codes';
import { UserCreateInputSchema, UserSchema, UserLoginInputSchema } from '@libs/user/user.schema';
import { UserService } from '@libs/user/user.service';
import { exclude } from '@libs/user/user.util';
import { inject, injectable, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';

@injectable()
export class AuthController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_service) private userService: UserService,
  ) { }


  public setup(): void {
    this.localLogin();
    this.localRegister();
  }

  @Controller({
    method: 'post',
    path: '/auth/register',
    request: {
      body: {
        content: {
          // Validation de l'input
          'application/json': {
            schema: UserCreateInputSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            // Validation de l'output
            schema: UserSchema,
          },
        },
      },
      409: {
        content: {
          'application/json': {
            // Validation de l'output
            schema: {},
          },
        },
      },
    },
  })
  private async localRegister(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserCreateInput;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdUser = await this.userService.create(body);
      ctx.status(StatusCodes.CREATED);
      return ctx.json(exclude(createdUser, ['password']));
    };
  }

  // TODO: add strategy to local login or next auth login
  @Controller({
    method: 'post',
    path: '/auth/login',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserLoginInputSchema,
          },
        },
      },
    },
    responses: {},
  })
  private async localLogin(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserLoginInput;
      const createdUser = await this.userService.login(body);
      ctx.status(StatusCodes.OK);
      return ctx.json(createdUser);
    };
  }
}
