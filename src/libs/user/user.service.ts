import Bun from 'bun';
import { Config } from '@config/config';
import { HttpErrors } from '@libs/errors/https-errors';
import { IUserCreateInput, IUser, IUserLoginInput } from './user.interface';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { UserRepository } from './user.repository';
import { inject, injectable, named } from 'inversify';
import { IUserEmail } from '@libs/schemas/user-email.schema';

// TODO: voir pour utiliser ça pour authentifier le user : https://github.com/nextauthjs/next-auth
@injectable()
export class UserService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) private config: Config,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) private userRepository: UserRepository,
  ) { }

  // TODO: décaler le create et login dans le auth
  public async create(user: IUserCreateInput): Promise<IUser> {
    const saltRound = this.config.get<number>('SALT_ROUND');
    const hashedPassword = await Bun.password.hash(user.password, {
      algorithm: 'bcrypt',
      cost: saltRound,
    });
    user.password = hashedPassword;
    return this.userRepository.create(user);
  }

  public async login(user: IUserLoginInput): Promise<any> {
    const userFound = await this.userRepository.findUniqueByEmail(user.email);
    if (userFound) {
      const userPassword = userFound.password ?? '';
      const isMatch = await Bun.password.verify(user.password, userPassword);
      if (isMatch) {
        return userFound;
      } else {
        // For security reason we will never tell if the user exist or not
        throw new HttpErrors(`User '${user.email}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
      }
    } else {
      throw new HttpErrors(`User '${user.email}' ${ReasonPhrases.NOT_FOUND}`, StatusCodes.NOT_FOUND);
    }
  }

  public async exist(user: IUserEmail): Promise<boolean | null> {
    const userExist = await this.userRepository.findUniqueByEmail(user.email);
    return !!userExist;
  }
}
