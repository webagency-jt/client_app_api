import { OpenapiFactory } from '@libs/core/factory/openapi.factory';
import { $Enums, UserSettings } from '@prisma/client';

export const UserSettingsInputSchema = OpenapiFactory.generateSchema<UserSettings>({
  schemaName: 'UserSettingsInput',
  params: [
    {
      required: true,
      type: 'string',
      name: 'userId',
      example: '65c7d4915826284e1cc90ce3',
    },
    {
      required: true,
      type: 'enum',
      enum: $Enums.Lang,
      name: 'lang',
    },
  ],
});

export const UserSettingsSchema = OpenapiFactory.generateSchema<UserSettings>({
  schemaName: 'UserSettings',
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
      type: 'enum',
      enum: $Enums.Lang,
      name: 'lang',
    },
  ],
});
