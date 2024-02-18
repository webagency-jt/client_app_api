import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { $Enums, User } from '@prisma/client';

export const UserCreateInputSchema = OpenapiFactory.generateSchema<User>({
  schemaName: 'UserCreateInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'username',
      rules: [
        {
          functionName: 'min',
          functionParam: 3,
        },
      ],
    },
    {
      required: true,
      type: 'string',
      name: 'email',
      example: 'example@gmail.com',
    },
    {
      required: true,
      type: 'string',
      name: 'password',
      rules: [
        {
          functionName: 'min',
          functionParam: 5,
        },
      ],
    },
  ],
});

export const UserLoginInputSchema = OpenapiFactory.generateSchema<User>({
  schemaName: 'UserLoginInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'email',
      example: 'example@gmail.com',
    },
    {
      required: true,
      type: 'string',
      name: 'password',
      rules: [
        {
          functionName: 'min',
          functionParam: 5,
        },
      ],
    },
  ],
});


export const UserSchema = OpenapiFactory.generateSchema<User>({
  schemaName: 'User',
  params: [
    {
      required: true,
      type: 'string',
      example: '65c7d4915826284e1cc90ce3',
      name: 'id',
    },
    {
      required: true,
      type: 'string',
      name: 'username',
    },
    {
      required: true,
      type: 'string',
      name: 'email',
    },
    {
      required: true,
      type: 'string',
      name: 'password',
    },
    {
      required: true,
      type: 'enum',
      enum: $Enums.UserRole,
      name: 'role',
    },
  ],
});
