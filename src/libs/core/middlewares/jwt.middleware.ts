import { Config } from '@config/config';
import { EnvEnum } from '@config/enums/env.enum';
import { MiddlewareHandler } from 'hono';
import { jwt } from 'hono/jwt';
import { injectable } from 'inversify';

@injectable()
export class JwtMiddleware {
  constructor(
    config: Config,
    private readonly middleware = jwt({
      secret: config.get<string>(EnvEnum.JWT_TOKEN),
    })
  ) { }

  public get(): MiddlewareHandler {
    return this.middleware;
  }
}
