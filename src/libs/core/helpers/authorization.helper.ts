import * as hono from 'hono';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { RequestMethod } from '../enums/request-method';
import { RouteParameters } from '../types/custom-hono-zod';
import { User, $Enums } from '@prisma/client';

export async function checkAuthorizationRoute(ctx: hono.Context, route: RouteParameters & { method: RequestMethod; }): Promise<void> {
  // TODO: see if there is a better option than doing the following
  const userJwt = ctx.get('jwtPayload') as User;
  let userId: string;
  if (route.method === RequestMethod.GET) {
    const params = ctx.req.param() as { userId: string; };
    userId = params?.userId;
  } else {
    const body = await ctx.req.json();
    userId = body?.userId;
  }
  if (userJwt.id !== userId && userJwt.role !== $Enums.UserRole.admin) {
    throw new HttpErrors(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
  }
}
