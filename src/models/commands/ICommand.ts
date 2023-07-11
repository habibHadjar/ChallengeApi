export interface ICommand {
  id: number;
  command: string;
  rank: number;
  question_id: number;
}

export type ICommandRO = Readonly<ICommand>;

export type ICommandCreate = Omit<ICommand, 'id'>;

export type ICommandUpdate = Partial<ICommandCreate>;