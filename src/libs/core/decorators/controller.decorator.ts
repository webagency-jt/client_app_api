import { GuardAbstract } from '@libs/guards/guard.absract';
import { SERVER, SERVER_TARGET } from '../constant';
import { RequestMethod } from '../enums/request-method';
import { RouteConfig } from '../types/hono-zod';
import { App } from '../server/server';
import { createRoute } from '@hono/zod-openapi';
import { HttpErrors } from '@libs/errors/https-errors';
import { User } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RouteParameters } from '../types/custom-hono-zod';

function guardHandle(guards: any) {
  for (const guard of guards) {
    // guard.run();
  }
}

async function secureRouteHandler(ctx: any, route: any) {
  // TODO: see if there is a better option than doing the following
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

function controllerHandler(options: RouteParameters, requestType: RequestMethod, target: any, thisArg: any) {
  const server: App = Reflect.getMetadata(SERVER, SERVER_TARGET);
  // Define route
  const { guards, secureRoute, ...routeMetadata } = options;
  const finalRouteMetadata = Object.assign(routeMetadata, {
    method: requestType,
  });
  const route = createRoute(finalRouteMetadata);

  return server.hono.openapi(route, async (ctx) => {
    // Todo: check to put this 2 validation in middleware
    if (secureRoute) {
      await secureRouteHandler(ctx, route);
    }
    if (guards) {
      guardHandle(guards);
    }
    return target.call(thisArg, ctx);
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
}

/**
 * To understand how this function work
 * @link https://stackoverflow.com/a/70910553/15431338
 */
export function createFunctionParameters(type: RequestMethod) {
  return (routeParameters: RouteParameters) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void | TypedPropertyDescriptor<any> => {
      const original = target[propertyKey];
      return {
        ...descriptor,
        value() {
          // At the moment controller function cannot have other parameter than ctx
          return controllerHandler(routeParameters, type, original, this);
        },
      };
    };
  };
}

export const Get = createFunctionParameters(RequestMethod.GET);

export const Post = createFunctionParameters(RequestMethod.POST);

export const Put = createFunctionParameters(RequestMethod.PUT);

export const Patch = createFunctionParameters(RequestMethod.PATCH);

export const Delete = createFunctionParameters(RequestMethod.DELETE);
