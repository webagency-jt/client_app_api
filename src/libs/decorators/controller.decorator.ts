import { createRoute } from '@hono/zod-openapi';
import { App } from '@libs/core/server/server';
import { HttpErrors } from '@libs/errors/https-errors';
import { User } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { GuardAbstract } from '@libs/guards/guard.absract';

// Find a way to type the option to the following
// TODO: add doc for option
export function Controller<T extends GuardAbstract = any>(options: RouteParameters<T>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      // Access to property server from caller
      const server: App = Reflect.get(this, 'server');
      // Define route
      const { guards, secureRoute, ...routeMetadata } = options;
      const route = createRoute(routeMetadata);

      return server.hono.openapi(route, async (ctx) => {
        // TODO: see if there is a better option than doing the following
        if (secureRoute) {
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
        if (guards) {
          for (const guard of guards) {
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
