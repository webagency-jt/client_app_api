import 'reflect-metadata';
import { App } from './server';
import { Container } from 'inversify';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { bindContainer } from '@config/utils/container';
import { expect, describe, it, beforeAll } from 'bun:test';

describe('App', () => {
  const container = new Container();

  beforeAll(() => {
    bindContainer(container);
  });

  it('Should initialize hono', () => {
    const app = container.get<App>();
    expect(app.hono).toBeDefined();
  });
});
