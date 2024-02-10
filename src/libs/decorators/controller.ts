import { createRoute } from '@hono/zod-openapi';
import { App } from '@libs/core/server/server';
import { StatusCodes } from 'http-status-codes';

// Find a way to type the option to the following
// <P extends string, R extends Omit<RouteConfig, 'path'> & {path: P;}>;
// At the moment `Zod OpenApi Hono` don't export all type
export function Controller(options: any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;
    descriptor.value = function () {
      // Access to property server from caller
      const server: App = Reflect.get(this, 'server');
      // Define route
      const route = createRoute(options);

      return server.hono.openapi(route, (ctx) => {
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
