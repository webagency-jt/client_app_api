import { OpenapiFactory } from '@libs/core/factory/openapi.factory';

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
