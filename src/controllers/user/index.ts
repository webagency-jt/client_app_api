import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { z } from '@hono/zod-openapi';
import { inject, injectable } from 'inversify';
import { IController } from '..';
import { App } from '@libs/core/server';
import { Controller } from '@libs/decorators/controller';
import * as hono from 'hono';
import { isContextDefined } from '@libs/core/helpers/context';
import { AppOrm } from '@libs/core/orm';

@injectable()
export class UserController implements IController {
  public constructor(
    @inject(SERVICE_IDENTIFIER.App) private server: App,
    @inject(SERVICE_IDENTIFIER.Orm) private orm: AppOrm,
  ) { }

  @Controller({
    method: 'post',
    path: '/user',
    responses: {
      200: {
        description: 'Respond a message',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  })
  public async setup(ctx?: hono.Context): Promise<any> {
    isContextDefined(ctx);
    if (ctx) {
      const body: any = await ctx.req.raw.json();

      // Creation d'un user avec ses relations
      // const user = await this.orm.client.user.create({
      //   data: {
      //     email: 'mathys@smartpublic.fr',
      //     password: 'salut',
      //     userInformations: {
      //       create: {
      //         firstname: 'coucou',
      //       },
      //     },
      //   },
      // });

      // Creation d'un user sans userInformations
      // const user = await this.orm.client.user.create({
      //   data: {
      //     email: 'mathys@smartpublic.fr',
      //     password: 'salut',
      //   },
      // });

      // Ajout des informations user
      // const user = await this.orm.client.userInformations.create({
      //   data: {
      //     userId: '65c249d08353246b98820eb3',
      //     firstname: 'michel',
      //   },
      // });

      // Récupération d'un user avec toutes ses données et ses relations
      const user = await this.orm.client.user.findUnique({
        where: {
          email: 'mtheoladfe@smartpublic.fr',
        },
        include: {
          userInformations: true,
        },
      });

      return ctx.json({
        age: 205,
        name: user,
      });
    };

  }
}
