import * as hono from 'hono';
import { App } from '@libs/core/server/server';
import { IController } from '..';
import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { UserInformationsCreateInputSchema, UserInformationsSchema, UserInformationsUpdateInputSchema } from '@libs/user/modules/user-informations/user-informations.schema';
import { UserInformationsService } from '@libs/user/modules/user-informations/user-informations.service';
import { injectable } from 'inversify';
import { isContextDefined } from '@libs/core/helpers/context';
import { z } from '@hono/zod-openapi';
import { Get, Post, Put } from '@libs/core/decorators/controller.decorator';

@injectable()
export class UserInformationsController implements IController {
  public constructor(
    private readonly server: App,
    private readonly userInformationsService: UserInformationsService,
  ) { }

  public setup(): any {
    this.updateSettings();
    this.createSettings();
    this.getSettings();
  }


  @Post({
    path: '/users/informations',
    request: {
      body: {
        content: {
          'application/json': {
            schema: UserInformationsCreateInputSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'to do',
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

  @Get({
    path: '/users/informations/{userId}',
    request: {
      params: z.object({
        userId: z.string(),
      }),
    },
    responses: {
      '200': {
        description: 'todo',
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

  @Put({
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
        description: 'todo',
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
