import { OpenapiFactory } from '@libs/core/factory/openapi.factory';

export const AuthorizationSchema = OpenapiFactory.generateSchema({
  params: [
    {
      required: true,
      type: 'string',
      example: 'Bearer token...',
      name: 'Authorization',
    },
  ],
});
