import { PARAMETER_METADATA, PARAMETER_METADATA } from '../constant';
import { RouteParamtypes } from '../enums/route-paramtypes.enum';

export type ParamData = object | string | number;

export interface RouteParamMetadata {
  index: number;
  data?: ParamData;
}

// More information about param decorator
// @link https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators

// export function required(target: Object, propertyKey: string | symbol, parameterIndex: number): any {
//   const existingRequiredParameters: number[] = Reflect.getOwnMetadata(PARAMETER_METADATA, target, propertyKey) || [];
//   existingRequiredParameters.push(parameterIndex);
//   Reflect.defineMetadata(PARAMETER_METADATA, existingRequiredParameters, target, propertyKey);
// }

export const Request: () => ParameterDecorator = createRouteParamDecorator(
  RouteParamtypes.REQUEST,
);

export function createRouteParamDecorator(paramtype: RouteParamtypes) {
  return (data?: ParamData): ParameterDecorator =>
    (target, key, index) => {
      if (key) {
        const args =
          Reflect.getMetadata(PARAMETER_METADATA, target.constructor, key) || {};
        Reflect.defineMetadata(
          PARAMETER_METADATA,
          assignMetadata<RouteParamtypes, Record<number, RouteParamMetadata>>(
            args,
            paramtype,
            index,
            {
              test: 'salut',
            },
          ),
          target.constructor,
          key,
        );
        console.log(Reflect.getMetadata(PARAMETER_METADATA, target.constructor, key));
      }
    };
}

export function assignMetadata<TParamtype = any, TArgs = any>(
  args: TArgs,
  paramtype: TParamtype,
  index: number,
  data?: ParamData,
) {
  return {
    ...args,
    [`${paramtype}:${index}`]: {
      index,
      data,
    },
  };
}
