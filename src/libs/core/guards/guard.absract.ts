import * as hono from 'hono';
import { injectable } from 'inversify';

@injectable()
export abstract class GuardAbstract {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public run(_ctx: hono.Context): void { }
}
