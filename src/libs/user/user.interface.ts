import { Prisma } from '@prisma/client';

export type UserWithoutPassword = Prisma.UserGetPayload<{
  select: {
    id: any,
    username: any,
    role: any,
  };
}>;

export type UserLoginInput = Prisma.UserGetPayload<{
  select: {
    username: any,
    password: any;
  };
}>;
