
@injectable()
export class UserService {

  public constructor(
    @inject(SERVICE_IDENTIFIER.Config) public config: Config,
  ) { }
}
