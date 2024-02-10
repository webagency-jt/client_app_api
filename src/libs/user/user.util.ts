import { IUser, IUserCreateInput } from './user.interface';

export function exclude<Property extends Record<string, any>, Key extends keyof Property>(
  user: Property,
  keys: Key[]
): Omit<Property, Key> {
  const filteredEntries = Object.entries(user)
    .filter(([key]) => !keys.includes(key as Key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Omit<Property, Key>);

  return filteredEntries;
}

export function UserInputTypeGuard(userInput: unknown): userInput is IUserCreateInput {
  return true;
}

export function UserTypeGuard(userInput: unknown): userInput is IUser {
  return true;
}
