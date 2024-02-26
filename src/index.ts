// !!Always import reflect metadata first
import 'reflect-metadata';
import 'dotenv/config';
import { App } from '@libs/core/server/server';
import { AppLogger } from '@libs/core/logger/logger';
import { Config, ENV_STATE_ENUM } from '@config/config';
import { ControllerRoot } from './controllers';
import { HTTPException } from 'hono/http-exception';
import { HttpErrors, isErrorReturnGuard } from '@libs/errors/https-errors';
import { Prisma } from '@prisma/client';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { mapPrismaClientErrors } from '@libs/errors/prisma.error';
import { sentry } from '@hono/sentry';
import { swaggerUI } from '@hono/swagger-ui';
import { CONTAINER, SERVER, SERVER_TARGET } from '@libs/core/constant';
import { BootstrapContainer } from '@libs/core/bootstrap/container';
import { EnvEnum } from './config/enums/env.enum';

// Initialize Hono
const container = BootstrapContainer.Container;
const appInstance = container.get(App);
const app = appInstance.hono;

Reflect.defineMetadata(SERVER, appInstance, SERVER_TARGET);
Reflect.defineMetadata(CONTAINER, container, SERVER_TARGET);

// Initialize Config
const config = container.get(Config);
config.validateEnv();

// Initialize Logger
const appLogger = container.get(AppLogger);

// Setup sentry
const env = config.get<ENV_STATE_ENUM>(EnvEnum.ENV);
const sentryPrivate = config.get<string>(EnvEnum.SENTRY_DSN);
if (sentryPrivate) {
  app.use('*', sentry({
    dsn: sentryPrivate,
    tracesSampleRate: 1.0,
    environment: env,
  }));
}

const withLog = config.get<boolean>(EnvEnum.LOGGER);
if (withLog) {
  // Setup Logger for Hono
  const customLogger = (message: any, ...rest: string[]) => {
    appLogger.pino.info(message, ...rest);
  };
  app.use('*', logger(customLogger));
}

if (env === ENV_STATE_ENUM.DEV) {
  // Setup swagger
  app.get('/swagger', swaggerUI({
    url: '/doc',
  }));

  // Setup open api
  const formattedUrl = `${config.get(EnvEnum.URL)}:${config.get(EnvEnum.PORT)}`;
  app.doc('doc', {
    info: {
      title: 'Aecreator Api',
      version: 'v1',
    },
    openapi: '3.1.0',
    servers: [{
      url: formattedUrl,
    }],
  });
}

// Setup security
const origin = config.get<string>(EnvEnum.ORIGINS).split(',');
app.use('*',
  cors({
    origin,
  })
);
app.use(
  '*',
  csrf({
    origin,
  })
);

// Error Handling
app.onError((err, c) => {
  appLogger.pino.error(err);
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  if (err instanceof HttpErrors) {
    const error = err.getError();
    c.status(error.httpCode);
    return c.json(error);
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError || err instanceof Prisma.PrismaClientUnknownRequestError) {
    const prismaError = mapPrismaClientErrors(err);
    if (isErrorReturnGuard(prismaError)) {
      c.status(prismaError.httpCode);
      return c.json(prismaError);
    }
  }

  return c.text(ReasonPhrases.INTERNAL_SERVER_ERROR, StatusCodes.INTERNAL_SERVER_ERROR);
});

// Setup all routes
const controllerRoot = container.get(ControllerRoot);
controllerRoot.setup();

// Set app port
const port = config.get<number>(EnvEnum.PORT);

appLogger.pino.info(`Hono 🥟 Server Listening on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
