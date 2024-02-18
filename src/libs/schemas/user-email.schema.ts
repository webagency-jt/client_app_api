import { z } from '@hono/zod-openapi';
import { Prisma } from '@prisma/client';

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

export type UserEmail = Prisma.UserGetPayload<{
  select: {
    email: any;
  };
}>;
