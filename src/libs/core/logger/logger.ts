import pino, { Logger } from 'pino';
import pretty from 'pino-pretty';
import { Config, ENV_STATE_ENUM } from '@config/config';
import { injectable } from 'inversify';
import { EnvEnum } from '@config/enums/env.enum';

type PinoType = Logger<never>;

@injectable()
export class AppLogger {
  private _pino: PinoType;

  public constructor(
    private readonly config: Config,
  ) {
    const env = this.config.get<ENV_STATE_ENUM>(EnvEnum.ENV);
    if (env === ENV_STATE_ENUM.DEV) {
      this._pino = pino(pretty({
        colorize: true,
      }));
    } else {
      this._pino = pino();
    }
  }

  get pino(): PinoType {
    return this._pino;
  }

  private set pino(logger: PinoType) {
    this._pino = logger;
  }
}
