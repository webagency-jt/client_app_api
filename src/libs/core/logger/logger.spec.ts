import 'reflect-metadata';
import { AppLogger } from './logger';
import { Container } from 'inversify';
import { bindContainer } from '@config/utils/container';
import { expect, describe, it, beforeAll } from 'bun:test';

describe('AppLogger', () => {
  const container = new Container();

  beforeAll(() => {
    bindContainer(container);
  });

  it('Should initialize pino', () => {
    const appLogger = container.get(AppLogger);
    expect(appLogger.pino).toBeDefined();
  });
});
