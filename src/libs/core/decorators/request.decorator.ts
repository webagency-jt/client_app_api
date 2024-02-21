import { PATH_METADATA, METHOD_METADATA } from '../constant';
import { RequestMethod } from '../enums/request-method';

interface RequestMappingMetadata {
  path?: string;
  method?: RequestMethod;
}

const defaultMetadata = {
  [PATH_METADATA]: '/',
  [METHOD_METADATA]: RequestMethod.GET,
};

const RequestMapping = (
  requestMapping: RequestMappingMetadata = defaultMetadata
): MethodDecorator => {
  const pathMetadata = requestMapping[PATH_METADATA];
  const path = pathMetadata && pathMetadata.length ? pathMetadata : '/';
  const requestMethod = requestMapping[METHOD_METADATA] || RequestMethod.GET;
  return (
    target: object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ) => {
    Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    Reflect.defineMetadata(METHOD_METADATA, requestMethod, descriptor.value);
    return descriptor;
  };
};

const createMappingDecorator =
  (method: RequestMethod) =>
    (path?: string): MethodDecorator => {
      return RequestMapping({
        [PATH_METADATA]: path,
        [METHOD_METADATA]: method,
      });
    };


// Pour encapsulé les requête et alors retourner ctx.json ou text ....
function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  const set = descriptor.set!;

  descriptor.set = function (value: T) {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    if (!(value instanceof type)) {
      throw new TypeError(`Invalid type, got ${typeof value} not ${type.name}.`);
    }

    set.call(this, value);
  };
}


export const Post = createMappingDecorator(RequestMethod.POST);

export const Get = createMappingDecorator(RequestMethod.GET);

export const Delete = createMappingDecorator(RequestMethod.DELETE);

export const Put = createMappingDecorator(RequestMethod.PUT);

export const Patch = createMappingDecorator(RequestMethod.PATCH);
