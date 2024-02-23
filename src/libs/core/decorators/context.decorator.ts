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

