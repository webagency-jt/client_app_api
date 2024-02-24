import * as hono from 'hono';
import { IController } from '..';
import { StatusCodes } from 'http-status-codes';
import { UserCreateInputSchema, UserSchema, UserLoginInputSchema } from '@libs/user/user.schema';
import { UserService } from '@libs/user/user.service';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { Prisma } from '@prisma/client';
import { UserLoginInput } from '@libs/user/user.interface';
import { Post } from '@libs/core/decorators/controller.decorator';

@injectable()
export class AuthController implements IController {
  public constructor(
    private readonly userService: UserService,
  ) { }


  public setup(): void {
    this.localLogin();
    this.localRegister();
  }

  @Post({
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
      '200': {
        description: 'test',
        content: {
          'application/json': {
            // Validation de l'output
            schema: UserSchema,
          },
        },
      },
      '409': {
        description: 'test',
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
      const body = await ctx.req.json() as Prisma.UserCreateInput;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdUser = await this.userService.create(body);
      ctx.status(StatusCodes.CREATED);
      return ctx.json(createdUser);
    };
  }

  // TODO: add strategy to local login or next auth login
  @Post({
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
      const body = await ctx.req.json() as UserLoginInput;
      const createdUser = await this.userService.login(body);
      ctx.status(StatusCodes.OK);
      return ctx.json(createdUser);
    };
  }
}
