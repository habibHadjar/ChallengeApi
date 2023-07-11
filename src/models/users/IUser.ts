export interface IUser {
  id: number;
  email: string;
}

export type IUserRO = Readonly<IUser>;

export type IUserCreate = Omit<IUser, 'id'>;

export type IUserUpdate = Partial<IUserCreate>;