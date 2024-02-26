import Bun from 'bun';
import { Config } from '@config/config';
import { HttpErrors } from '@libs/errors/https-errors';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { UserRepository } from './user.repository';
import { injectable } from 'inversify';
import { UserUsername } from '@libs/schemas/user-email.schema';
import { exclude } from './user.util';
import { sign } from 'hono/jwt';
import { Prisma } from '@prisma/client';
import { UserLoginInput, UserWithoutPassword } from './user.interface';
import { EnvEnum } from '@config/enums/env.enum';

@injectable()
export class UserService {

  public constructor(
    private readonly config: Config,
    private readonly userRepository: UserRepository,
  ) { }

  // TODO: décaler le create et login dans le auth
  public async create(user: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const saltRound = this.config.get<number>(EnvEnum.SALT_ROUND);
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

  public async login(user: UserLoginInput): Promise<UserWithoutPassword & { token: string; }> {
    const userFound = await this.userRepository.findUniqueByUsername(user.username);
    if (userFound) {
      const userPassword = userFound.password ?? '';
      const password = user.password ?? '';
      const isMatch = await Bun.password.verify(password, userPassword);
      if (isMatch) {
        const userWithoutPassword = exclude(userFound, ['password']);
        const jwtSecret = this.config.get<string>(EnvEnum.JWT_TOKEN);
        const token = await sign(userWithoutPassword, jwtSecret);
        return {
          ...userWithoutPassword,
          token,
        };
      } else {
        // For security reason we will never tell if the user exist or not
        throw new HttpErrors(`User '${user.username}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
      }
    } else {
      throw new HttpErrors(`User '${user.username}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
    }
  }

  public async exist(user: UserUsername): Promise<boolean | null> {
    const userExist = await this.userRepository.findUniqueByUsername(user.username);
    return !!userExist;
  }
}
