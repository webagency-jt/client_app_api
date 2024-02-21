import { GuardAbstract } from './guard.absract';
import * as hono from 'hono';
import { $Enums, User } from '@prisma/client';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { injectable } from 'inversify';

@injectable()
export class AdminGuard extends GuardAbstract {
  public run(ctx: hono.Context): void {
    const user = ctx.get('jwtPayload') as User;
    if (user.role === $Enums.UserRole.user) {
      throw new HttpErrors(ReasonPhrases.UNAUTHORIZED, StatusCodes.UNAUTHORIZED);
    }
  }
}
