import { GuardAbstract } from '@libs/guards/guard.absract';
import { SERVER, SERVER_TARGET } from '../constant';
import { RequestMethod } from '../enums/request-method';
import { RouteConfig } from '../types/hono-zod';

type ControllerMetadata<T extends GuardAbstract = any> = RouteConfig & {
  /** Define if the route need a specific permission to be accessed */
  guards?: T[],
  /** if an user try to an action that is for a different account then block it */
  secureRoute?: boolean,
};

// Essayer de faire en sorte que lorsque cette fonction est call elle est automatiquement enregistré dans hono
function Controller(
  openapiMetadata?: ControllerMetadata,
  type: RequestMethod,
): any {
  return function itSelft(target) {
    const server = Reflect.getMetadata(SERVER, SERVER_TARGET);
    console.log('fffff', server);
  };
}

function createFunctionParameters(type: RequestMethod) {
  return (path?: ControllerMetadata) => Controller(path, type);
}

export const Get = createFunctionParameters(RequestMethod.GET);

export const Post = createFunctionParameters(RequestMethod.POST);

export const Put = createFunctionParameters(RequestMethod.PUT);

export const Patch = createFunctionParameters(RequestMethod.PATCH);

export const Delete = createFunctionParameters(RequestMethod.DELETE);
