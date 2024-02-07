import { z } from '@hono/zod-openapi';

export interface IUserInput {
  username: string,
  password: string,
  email: string,
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  password: string | null;
}
export function UserInputTypeGuard(userInput: unknown): userInput is IUserInput {
  return true;
}

export const UserInputSchema = z.object({
  username: z.string().min(3),
  password: z
    .string()
    .min(5)
    .openapi({
      param: {
        name: 'password',
        in: 'path',
      },
      example: '1212121',
    }),
  email: z
    .string()
    .email()
    .openapi({
      param: {
        name: 'email',
        in: 'path',
      },
      example: 'example@gmail.com',
    }),
});


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
