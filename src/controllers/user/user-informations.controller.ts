import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { Controller } from '@libs/decorators/controller';
import { IController } from '..';
import { Prisma } from '@prisma/client';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { StatusCodes } from 'http-status-codes';
import { UserInformationsInputSchema, UserInformationsSchema, UserInformationsUpdateInputSchema } from '@libs/user/modules/user-informations/user-informations.schema';
import { UserInformationsService } from '@libs/user/modules/user-informations/user-informations.service';
import { injectable, inject, named } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { z } from '@hono/zod-openapi';

@injectable()
export class UserInformationsController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_informations_service) private userInformationsService: UserInformationsService,
  ) { }

  public setup(): any {
    this.updateSettings();
    this.createSettings();
    this.getSettings();
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
      const body = await ctx.req.json() as Prisma.UserInformationsUncheckedCreateInput;
      const userCreated = await this.userInformationsService.create(body);
      ctx.status(StatusCodes.CREATED);
      return ctx.json(userCreated);
    };
  }

  @Controller({
    method: 'get',
    path: '/users/informations/{userId}',
    request: {
      params: z.object({
        userId: z.string(),
      }),
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
  private async getSettings(ctx?: hono.Context): Promise<unknown> {
    isContextDefined(ctx);
    if (ctx) {
      const { userId } = ctx.req.param();
      const userFound = await this.userInformationsService.findUnique(userId);
      return ctx.json(userFound);
    };
  }

  @Controller({
    method: 'put',
    secureRoute: true,
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
      const body = await ctx.req.json() as Prisma.UserInformationsUncheckedUpdateInput;
      const updatedInformations = await this.userInformationsService.update(body);
      ctx.status(StatusCodes.OK);
      return ctx.json(updatedInformations);
    };
  }

}
