import { Prisma } from '@prisma/client';

export type UserWithoutPassword = Prisma.UserGetPayload<{
  select: {
    id: any,
    email: any,
    username: any,
    role: any,
  }
}>;

export type UserLoginInput = Prisma.UserGetPayload<{
  select: {
    email: any,
    password: any
  }
}>;
