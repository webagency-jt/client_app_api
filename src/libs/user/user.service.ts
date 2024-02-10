import bcrypt from 'bcrypt';
import { IUserInput, IUser } from './user.interface';
import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable, named } from 'inversify';
import { UserRepository } from './user.repository';
import { SERVICE_NAME } from '@config/ioc/service-name';
import { Config } from '@config/config';

// TODO: voir pour utiliser ça pour authentifier le user : https://github.com/nextauthjs/next-auth
@injectable()
export class UserService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) private config: Config,
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_repository) private userRepository: UserRepository,
  ) { }

  public async create(user: IUserInput): Promise<IUser> {
    const saltRound = this.config.get<number>('SALT_ROUND');
    const generatedSalt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(user.password, generatedSalt);
    user.password = hashedPassword;
    return this.userRepository.create(user);
  }

  public async login(): Promise<any> {
    // const match = await bcrypt.compare(password, user.passwordHash);

  }
}
