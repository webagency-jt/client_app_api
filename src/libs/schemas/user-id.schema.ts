import { z } from '@hono/zod-openapi';

export const UserIdSchema = z.object({
  userId: z
    .string()
    .openapi({
      param: {
        name: 'userId',
      },
      example: '65c7d4915826284e1cc90ce3',
    }),
});


export interface IUserId {
  userId: string;
}
