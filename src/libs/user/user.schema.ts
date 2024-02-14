import { z } from '@hono/zod-openapi';

export const UserCreateInputSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(6)
    .openapi({
      param: {
        name: 'password',
      },
      example: '1212121',
    }),
  email: z
    .string()
    .email()
    .openapi({
      param: {
        name: 'email',
      },
      example: 'example@gmail.com',
    }),
});

export const UserLoginInputSchema = z.object({
  email: z
    .string()
    .email()
    .openapi({
      param: {
        name: 'email',
      },
      example: 'example@gmail.com',
    }),
  password: z
    .string()
    .min(5)
    .openapi({
      param: {
        name: 'password',
      },
      example: '1212121',
    }),
});

// TODO: complete this schema
export const UserSchema = z
  .object({
    id: z.string().openapi({
      example: '123',
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    age: z.number().openapi({
      example: 42,
    }),
  })
  .openapi('User');
