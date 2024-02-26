import { SafeParseError, TypeOf, ZodError, z } from 'zod';
import { injectable } from 'inversify';

export enum ENV_STATE_ENUM {
  PROD = 'PROD',
  DEV = 'DEV',
}

// Fixes the return error from the Zod library.
function hashError(safeParseReturn: any): safeParseReturn is SafeParseError<ZodError<any>> {
  return safeParseReturn?.error;
}

// Enables the definition of a default value within the development environment.
// No default value is set in production.
const withDevDefault = <T extends z.ZodTypeAny>(
  schema: T,
  val: TypeOf<T>
) => (process.env.ENV !== ENV_STATE_ENUM.PROD ? schema.default(val) : schema);

@injectable()
export class Config {
  /**
   * Where all app env will be validated
   */
  public validateEnv(): void {
    const schema = z.object({
      PORT: withDevDefault(z.string(), '3000').transform(Number),
      ENV: withDevDefault(z.nativeEnum(ENV_STATE_ENUM), ENV_STATE_ENUM.DEV),
      URL: withDevDefault(z.string(), 'http://localhost'),
      DATABASE_URL: withDevDefault(z.string(), '3000'),
      DATABASE_NAME: withDevDefault(z.string(), 'webAgency'),
      ORIGINS: withDevDefault(z.string(), '*'),
      LOGGER: withDevDefault(z.string().transform(Boolean), true),
      SENTRY_DSN: withDevDefault(z.string(), ''),
      JWT_TOKEN: withDevDefault(z.string(), 'r7UvT9fzcUFeHp4mzI0LJqVZ8GEMS3UDtsc'),
      SALT_ROUND: withDevDefault(z.string().transform(Number), 5),
    });

    const parsed = schema.safeParse(process.env);

    if (hashError(parsed)) {
      console.error(
        '❌ Invalid environment variables:',
        JSON.stringify(parsed.error.format(), null, 4)
      );
      process.exit(1);
    }
  }

  /**
   * Get env variables
   */
  public get<T>(value: string): T {
    const envValue = process.env[value];

    if (envValue === 'true') {
      return true as T;
    }

    if (envValue === 'false') {
      return false as T;
    }

    if (typeof envValue === 'string' && !isNaN(Number(envValue))) {
      return Number(envValue) as T;
    }

    return envValue as T;
  }
}
