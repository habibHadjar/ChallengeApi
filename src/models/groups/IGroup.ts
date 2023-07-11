import { IChallenge } from "../challenges/IChallenge";
import { IStudent } from "../students/IStudent";

export interface IGroup {
  id: number;
  name: string;
  students: IStudent[];
  challenges: IChallenge[];
}

export type IGroupRO = Readonly<IGroup>;

export type IGroupCreate = Omit<IGroup, 'id'|'students'|'challenges'>;

export type IGroupUpdate = Partial<IGroupCreate>;