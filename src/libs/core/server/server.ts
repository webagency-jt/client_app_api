import { Env } from 'hono';
import { OpenAPIHono } from '@hono/zod-openapi';
import { injectable } from 'inversify';
import { SERVER, SERVER_TARGET } from '../constant';

@injectable()
export class App {
  private _hono = new OpenAPIHono();

  constructor() {
    console.log('cc');
    Reflect.defineMetadata(SERVER, 'salut', SERVER_TARGET);
  }

  get hono(): OpenAPIHono<Env, {}, '/'> {
    return this._hono;
  }
}
