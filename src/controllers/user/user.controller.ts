import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { IUserInput } from '@libs/user/user.interface';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { StatusCodes } from 'http-status-codes';
import { UserInputSchema, UserSchema } from '@libs/user/user.schema';
import { UserRepository } from '@libs/user/user.repository';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { exclude } from '@libs/user/user.util';

// Lien de la documentation de openapi validation: https://github.com/asteasolutions/zod-to-openapi#defining-custom-components
@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) private userRepository: UserRepository,
  ) { }


  public setup(): any {
    this.create();
  }

  @Controller({
    method: 'post',
    path: '/users/{id}',
    request: {
      body: {
        content: {
          // Validation de l'input
          'application/json': {
            schema: UserInputSchema,
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
  private async create(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserInput;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const createdUser = await this.userRepository.create(body);
      ctx.status(StatusCodes.CREATED);
      return ctx.json(exclude(createdUser, ['password']));
    };
  }
}
