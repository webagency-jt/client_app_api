import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { Prisma } from '@prisma/client';

export type UserEmail = Prisma.UserGetPayload<{
  select: {
    email: any;
  };
}>;

export const userEmailSchema = OpenapiFactory.generateSchema<UserEmail>({
  schemaName: 'UserEmail',
  params: [
    {
      required: true,
      type: 'string',
      example: 'hello@gmail.com',
      name: 'email',
    },
  ],
});
