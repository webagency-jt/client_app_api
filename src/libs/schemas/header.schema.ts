import { OpenapiFactory } from '@libs/core/factory/openapi.factory';

// TODO: essayé de comprendre pourquoi lorsque il est typé en string, cela ne fonctionne pas
export const AuthorizationSchema = OpenapiFactory.generateSchema({
  params: [
    {
      required: true,
      type: 'any',
      example: 'Bearer token...',
      name: 'Authorization',
    },
  ],
});
