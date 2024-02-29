import { injectable } from 'inversify';
import { IController } from '..';
import { App } from '@libs/core/server/server';
import { JwtMiddleware } from '@libs/core/middlewares/jwt.middleware';
import { SitesController } from './sites.controller';

@injectable()
export class SitesRootController implements IController {
  public constructor(
    private readonly server: App,
    private readonly jwtMiddleware: JwtMiddleware,
    private readonly sitesController: SitesController,
  ) { }

  public setup(): void {
    this.server.hono.use(
      '/sites/*',
      this.jwtMiddleware.get(),
    );
    this.sitesController.setup();
  }
}
