import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { IUserInformations } from '@libs/user/modules/user-informations/user-informations.interface';
import { UserInformationsService } from '@libs/user/modules/user-informations/user-informations.service';
import { UserInformationsInputSchema, UserInformationsSchema, UserInformationsUpdateInputSchema } from '@libs/user/modules/user-informations/user-informations.schema';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class UserInformationsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_informations_service) private userInformationsService: UserInformationsService,
  ) { }

  public setup(): any {
    this.updateSettings();
    this.createSettings();
  }


  @Controller({
    method: 'post',
    path: '/users/informations',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserInformationsInputSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserInformationsSchema,
          },
        },
      },
    },
  })
  private async createSettings(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as IUserInformations;
      const userCreated = await this.userInformationsService.create(body);
      ctx.status(StatusCodes.CREATED);
      return ctx.json(userCreated);
    };
  }


  @Controller({
    method: 'put',
    path: '/users/informations',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserInformationsUpdateInputSchema,
          },
        },
      },
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: UserInformationsSchema,
          },
        },
      },
    },
  })
  private async updateSettings(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const body = await ctx.req.json() as Partial<IUserInformations>;
      const updatedInformations = await this.userInformationsService.update(body);
      ctx.status(StatusCodes.OK);
      return ctx.json(updatedInformations);
    };
  }

}
