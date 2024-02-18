import { OpenapiFactory } from '@libs/core/factory/openapi.factory';

export interface IUserId {
  userId: string;
}

// TODO: exposer ce schema
export const UserIdSchema = OpenapiFactory.generateSchema<IUserId>({
  schemaName: 'UserId',
  params: [
    {
      required: true,
      type: 'string',
      example: '65c7d4915826284e1cc90ce3',
      name: 'userId',
    },
  ],
});
