import { Config } from '@config/config';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { MiddlewareHandler } from 'hono';
import { jwt } from 'hono/jwt';
import { inject, injectable } from 'inversify';

@injectable()
export class JwtMiddleware {
  constructor(
    @inject(SERVICE_IDENTIFIER.Config) config: Config,
    private readonly middleware = jwt({
      secret: config.get<string>('JWT_TOKEN'),
    })
  ) { }

  public get(): MiddlewareHandler {
    return this.middleware;
  }
}
