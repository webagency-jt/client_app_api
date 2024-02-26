import * as hono from 'hono';
import { CONTAINER, GUARD, SERVER_TARGET } from '../constant';
import { GuardAbstract } from '../guards/guard.absract';
import { GuardsType } from '../guards/guard.type';
import { Container } from 'inversify';

export function guardHandler<T extends GuardAbstract = any>(guards: GuardsType[], ctx?: hono.Context) {
  const container: Container = Reflect.getMetadata(CONTAINER, SERVER_TARGET);
  for (const guard of guards) {
    const resolvedGuard = container.get(guard);
    resolvedGuard.run(ctx);
  }
}
function createFunctionParameters() {
  return (guard: GuardsType[]) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void | TypedPropertyDescriptor<any> => {
      const original = target[propertyKey];
      Reflect.defineMetadata(GUARD, guard, original);
      return {
        ...descriptor,
        value() {
          return original.call(this);
        },
      };
    };
  };
}

export const Guard = createFunctionParameters();
