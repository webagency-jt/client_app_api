
/**
 * Definition of named for dependency injection
 * @link https://github.com/inversify/InversifyJS/blob/master/wiki/named_bindings.md
 */
const SERVICE_NAME = {
  controllers: {
    root: 'root',
    user: 'user',
    posts: 'posts',
    notifications: 'notifications',
  },
  libs: {
    user_repository: 'user_repository',
    user_service: 'user_service',
  },
};

export { SERVICE_NAME };

