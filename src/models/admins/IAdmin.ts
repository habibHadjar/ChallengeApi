import { IUser } from "../users/IUser";

export interface IAdmin extends IUser {
  password: string;
}

export type IAdminRO = Readonly<IAdmin>;

export type IAdminCreate = Omit<IAdmin, 'id'>;

export type IAdminUpdate = Partial<IAdminCreate>;