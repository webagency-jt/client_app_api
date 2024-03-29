import 'reflect-metadata';
import { AppLogger } from '@libs/core/logger/logger';
import { Container } from 'inversify';
import { beforeAll, describe, expect, it } from 'bun:test';
import { bindContainer } from '@config/utils/container';

/**
 * Bind class and check if inversify can resolve them
 */
describe('Inversify binding test', () => {
  const container = new Container();

  // ! Should be set in every tests files
  beforeAll(() => {
    bindContainer(container);
  });

  it('Should resolve appLogger', () => {
    const appLogger = container.get(AppLogger);
    expect(appLogger).toBeDefined();
    // Checking type
    expect(appLogger).toBeInstanceOf(AppLogger);
  });
});
