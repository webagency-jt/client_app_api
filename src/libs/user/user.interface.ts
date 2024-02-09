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
