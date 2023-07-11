export interface IQuestion {
  id: number;
  text: string;
  description?: string;
  failure_message?: string;
  rank: number;
  challenge_id: number;
}

export type IQuestionRO = Readonly<IQuestion>;

export type IQuestionCreate = Omit<IQuestion, 'id'>;

export type IQuestionUpdate = Partial<IQuestionCreate>;