import { createRoute } from '@hono/zod-openapi';
import { App } from '@libs/core/server/server';
import { HttpErrors } from '@libs/errors/https-errors';
import { User } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { GuardAbstract } from '@libs/guards/guard.absract';

// Find a way to type the option to the following
// <P extends string, R extends Omit<RouteConfig, 'path'> & {path: P;}>;
// At the moment `Zod OpenApi Hono` don't export all type
// TODO: add doc for option
// TODO: dans le futur réecrire entièrement cette fonction pour la rendre plus propre
export function Controller<T extends GuardAbstract>(options: {
  method: 'post' | 'put' | 'get' | 'patch',
  path: string,
  responses: any,
  request?: any,
  /** Define if the route need a specific permission to be accessed */
  guards?: T[],
  /** if an user try to an action that is for a different account then block it */
  secureRoute?: boolean,
}) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      // Access to property server from caller
      const server: App = Reflect.get(this, 'server');
      // Define route
      const route = createRoute(options);

      return server.hono.openapi(route, async (ctx) => {
        // TODO: see if there is a better option than doing the following
        if (options?.secureRoute) {
          const userJwt = ctx.get('jwtPayload') as User;
          let userId: string;
          if (route.path === 'get') {
            const params = ctx.req.param() as { userId: string; };
            userId = params?.userId;
          } else {
            const body = await ctx.req.json();
            userId = body?.userId;
          }
          if (userJwt.id !== userId) {
            throw new HttpErrors(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
          }
        }
        if (options.guards) {
          for (const guard of options.guards) {
            guard.run(ctx);
          }
        }
        return originalMethod.call(this, ctx);
      }, (result, c) => {
        if (!result.success) {
          console.error(result.error);
          return c.json(
            {
              code: StatusCodes.BAD_REQUEST,
              message: result.error,
            },
            StatusCodes.BAD_REQUEST
          );
        }
      });
    };
    // Return descriptor
    return descriptor;
  };
}
