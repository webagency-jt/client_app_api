import { OpenapiFactory } from '@libs/core/factory/openapi.factory';

// TODO: exposer ce schema a hono
export const ErrorSchema = OpenapiFactory.generateSchema({
  schemaName: 'Error',
  params: [
    {
      required: true,
      type: 'number',
      example: 400,
      name: 'code',
    },
    {
      required: true,
      type: 'string',
      example: 'Bad Request',
      name: 'message',
    },
  ],
});
