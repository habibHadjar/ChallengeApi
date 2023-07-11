import { IGroup } from "../groups/IGroup";
import { IQuestion } from "../questions/IQuestion";
import { IUser } from "../users/IUser";

export interface IStudent extends IUser {
  firstname: string;
  lastname: string;
  groups: IGroup[];
  questions: IQuestion[];
}

export type IStudentRO = Readonly<IStudent>;

export type IStudentCreate = Omit<IStudent, 'id'|'groups'|'questions'>;

export type IStudentUpdate = Partial<IStudentCreate>;