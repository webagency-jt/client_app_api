import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { Prisma } from '@prisma/client';

export type UserUsername = Prisma.UserGetPayload<{
  select: {
    username: any;
  };
}>;

export const userUsernameSchema = OpenapiFactory.generateSchema<UserUsername>({
  schemaName: 'UserUsername',
  params: [
    {
      required: true,
      type: 'string',
      example: 'hello@gmail.com',
      name: 'username',
    },
  ],
});
