import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { Prisma, UserInformations } from '@prisma/client';

export const UserInformationsCreateInputSchema = OpenapiFactory.generateSchema<Prisma.UserInformationsUncheckedUpdateInput>({
  schemaName: 'UserInformationsCreateInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'userId',
    },
    {
      required: true,
      type: 'string',
      name: 'address',
    },
    {
      required: true,
      type: 'string',
      name: 'city',
    },
    {
      required: true,
      type: 'string',
      name: 'firstname',
    },
    {
      required: true,
      type: 'string',
      name: 'lastname',
    },
    {
      required: true,
      type: 'string',
      name: 'phoneNumber',
    },
    {
      required: true,
      type: 'string',
      name: 'siret',
    },
    {
      required: true,
      type: 'string',
      name: 'state',
    },
    {
      required: true,
      type: 'number',
      name: 'tva',
    },
    {
      required: true,
      type: 'string',
      name: 'zip',
    },
    {
      required: true,
      type: 'string',
      name: 'email',
      rules: [
        {
          functionName: 'email',
        },
      ],
    },
  ],
});

export const UserInformationsUpdateInputSchema = OpenapiFactory.generateSchema<Prisma.UserInformationsUncheckedUpdateInput>({
  schemaName: 'UserInformationsUpdateInput',
  params: [
    {
      required: false,
      type: 'string',
      name: 'userId',
    },
    {
      required: false,
      type: 'string',
      name: 'address',
    },
    {
      required: false,
      type: 'string',
      name: 'city',
    },
    {
      required: false,
      type: 'string',
      name: 'firstname',
    },
    {
      required: false,
      type: 'string',
      name: 'lastname',
    },
    {
      required: false,
      type: 'string',
      name: 'phoneNumber',
    },
    {
      required: false,
      type: 'string',
      name: 'siret',
    },
    {
      required: false,
      type: 'string',
      name: 'state',
    },
    {
      required: false,
      type: 'number',
      name: 'tva',
    },
    {
      required: false,
      type: 'string',
      name: 'zip',
    },
    {
      required: false,
      type: 'string',
      name: 'email',
      rules: [
        {
          functionName: 'email',
        },
      ],
    },
  ],
});


export const UserInformationsSchema = OpenapiFactory.generateSchema<UserInformations>({
  schemaName: 'UserInformations',
  params: [
    {
      required: true,
      type: 'string',
      name: 'id',
    },
    {
      required: true,
      type: 'string',
      name: 'userId',
      example: '65c7d4915826284e1cc90ce3',
    },
    {
      required: true,
      type: 'string',
      name: 'address',
    },
    {
      required: true,
      type: 'string',
      name: 'city',
    },
    {
      required: true,
      type: 'string',
      name: 'firstname',
    },
    {
      required: true,
      type: 'string',
      name: 'lastname',
    },
    {
      required: true,
      type: 'string',
      name: 'phoneNumber',
    },
    {
      required: true,
      type: 'string',
      name: 'siret',
    },
    {
      required: true,
      type: 'string',
      name: 'state',
    },
    {
      required: true,
      type: 'number',
      name: 'tva',
    },
    {
      required: true,
      type: 'string',
      name: 'zip',
    },
    {
      required: true,
      type: 'string',
      name: 'email',
      rules: [
        {
          functionName: 'email',
        },
      ],
    },
  ],
});
