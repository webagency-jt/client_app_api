import { z } from '@hono/zod-openapi';

export const userEmailSchema = z.object({
  email: z
    .string()
    .openapi({
      param: {
        name: 'email',
      },
      example: 'hello@gmail.com',
    }),
});

// TODO: mettre un filter
export interface IUserEmail {
  email: string;
}
