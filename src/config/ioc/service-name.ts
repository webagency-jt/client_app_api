
/**
 * Definition of named for dependency injection
 * @link https://github.com/inversify/InversifyJS/blob/master/wiki/named_bindings.md
 */
const SERVICE_NAME = {
  controllers: {
    auth: 'auth',
    notifications: 'notifications',
    root: 'root',
    user: 'user',
    user_root: 'user_root',
    user_settings: 'user_settings',
    user_informations: 'user_informations',
  },
  libs: {
    user_repository: 'user_repository',
    user_settings_repository: 'user_settings_repository',
    user_settings_service: 'user_settings_service',
    user_informations_service: 'user_informations_service',
    user_informations_repository: 'user_informations_repository',
    user_service: 'user_service',
  },
  middleware: {
    jwt_middleware: 'jwt_middleware',
  },
};

export { SERVICE_NAME };

