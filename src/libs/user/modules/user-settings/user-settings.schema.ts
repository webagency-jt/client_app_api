import { z } from '@hono/zod-openapi';
import { $Enums } from '@prisma/client';

export const UserSettingsInputSchema = z.object({
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
  lang: z
    .nativeEnum($Enums.Lang)
    .openapi({
      param: {
        name: 'lang',
      },
      example: 'fr',
    }),
});


export const UserSettingsSchema = z.object({
  id: z.string(),
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
  lang: z
    .string()
    .openapi({
      param: {
        name: 'lang',
      },
      example: 'fr',
    }),
}).openapi('UserSettings');

