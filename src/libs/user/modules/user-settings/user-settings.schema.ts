import { z } from '@hono/zod-openapi';

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
    .string()
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

