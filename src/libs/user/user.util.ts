import { IUserInput } from './user.interface';

export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

export function UserInputTypeGuard(userInput: unknown): userInput is IUserInput {
  return true;
}
