export interface IStudentQuestion {
  user_id: number;
  group_id: number;
}

export type IStudentQuestionRO = Readonly<IStudentQuestion>;

export type IStudentQuestionCreate = IStudentQuestion;

export type IStudentQuestionUpdate = Partial<IStudentQuestionCreate>;