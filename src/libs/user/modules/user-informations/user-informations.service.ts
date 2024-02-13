import { SERVICE_IDENTIFIER } from '@config/ioc/service-identifier';
import { inject, injectable, named } from 'inversify';
import { UserInformationsRepository } from './user-informations.repository';
import { SERVICE_NAME } from '@config/ioc/service-name';

@injectable()
export class UserInformationsService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Libs) @named(SERVICE_NAME.libs.user_informations_repository) public userInformationsRepository: UserInformationsRepository,
  ) { }

}
