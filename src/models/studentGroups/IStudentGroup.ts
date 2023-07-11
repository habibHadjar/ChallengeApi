export interface IStudentGroup {
  user_id: number;
  challenge_id: number;
}

export type IStudentGroupRO = Readonly<IStudentGroup>;

export type IStudentGroupCreate = IStudentGroup;

export type IStudentGroupUpdate = Partial<IStudentGroupCreate>;