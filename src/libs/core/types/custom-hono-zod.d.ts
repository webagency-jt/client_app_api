import { RouteConfig } from './hono-zod';

export type RouteParameters = RouteConfig & {
  /** if an user try to an action that is for a different account then block it */
  secureRoute?: boolean,
};
