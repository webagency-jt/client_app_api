import { RouteConfig } from './hono-zod';

/**
 * Problem only 1 guard can be typed
 */
export type RouteParameters<T extends GuardAbstract = any> = RouteConfig & {
  /** Define if the route need a specific permission to be accessed */
  guards?: T[],
  /** if an user try to an action that is for a different account then block it */
  secureRoute?: boolean,
};
