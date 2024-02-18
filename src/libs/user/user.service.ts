import Bun from 'bun';
import { Config } from '@config/config';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserRepository } from './user.repository';
import { inject, injectable, named } from 'inversify';
import { UserEmail } from '@libs/schemas/user-email.schema';
import { exclude } from './user.util';
import { sign } from 'hono/jwt';
import { Prisma } from '@prisma/client';
import { UserLoginInput, UserWithoutPassword } from './user.interface';

@injectable()
export class UserService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) private config: Config,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) private userRepository: UserRepository,
  ) { }

  // TODO: décaler le create et login dans le auth
  public async create(user: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const saltRound = this.config.get<number>('SALT_ROUND');
    const password = user.password ?? '';
    const hashedPassword = await Bun.password.hash(password, {
      algorithm: 'bcrypt',
      cost: saltRound,
    });
    user.password = hashedPassword;
    const createdUser = await this.userRepository.create(user);
    const userWithoutPassword = exclude(createdUser, ['password']);
    return userWithoutPassword;
  }

  public async login(user: UserLoginInput): Promise<UserWithoutPassword & { token: string }> {
    const userFound = await this.userRepository.findUniqueByEmail(user.email);
    if (userFound) {
      const userPassword = userFound.password ?? '';
      const password = user.password ?? '';
      const isMatch = await Bun.password.verify(password, userPassword);
      if (isMatch) {
        const userWithoutPassword = exclude(userFound, ['password']);
        const jwtSecret = this.config.get<string>('JWT_TOKEN');
        const token = await sign(userWithoutPassword, jwtSecret);
        return {
          ...userWithoutPassword,
          token,
        };
      } else {
        // For security reason we will never tell if the user exist or not
        throw new HttpErrors(`User '${user.email}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
      }
    } else {
      throw new HttpErrors(`User '${user.email}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
    }
  }

  public async exist(user: UserEmail): Promise<boolean | null> {
    const userExist = await this.userRepository.findUniqueByEmail(user.email);
    return !!userExist;
  }
}
