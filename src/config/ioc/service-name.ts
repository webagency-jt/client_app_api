
/**
 * Definition of named for dependency injection
 * @link https://github.com/inversify/InversifyJS/blob/master/wiki/named_bindings.md
 */
const SERVICE_NAME = {
  controllers: {
    auth: 'auth',
    notifications: 'notifications',
    posts: 'posts',
    root: 'root',
    user: 'user',
    user_root: 'user_root',
    user_settings: 'user_settings',
  },
  libs: {
    user_repository: 'user_repository',
    user_settings_repository: 'user_settings_repository',
    user_settings_service: 'user_settings_service',
    user_service: 'user_service',
  },
};

export { SERVICE_NAME };

