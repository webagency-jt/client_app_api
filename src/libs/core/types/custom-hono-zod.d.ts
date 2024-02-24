import { GuardAbstract } from '@libs/guards/guard.absract';
import { RouteConfig } from './hono-zod';

export type RouteParameters = RouteConfig & {
  /** Define if the route need a specific permission to be accessed */
  guards?: Array<GuardAbstract>,
  /** if an user try to an action that is for a different account then block it */
  secureRoute?: boolean,
};
