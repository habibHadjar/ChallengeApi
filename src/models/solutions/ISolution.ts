import { ICommand } from "../commands/ICommand";

export interface ISolution {
  id: number;
  stdout?: string;
  stderr?: string;
  command_id: number;
  command: ICommand;
}

export type ISolutionRO = Readonly<ISolution>;

export type ISolutionCreate = Omit<ISolution, 'id'|'command'>;

export type ISolutionUpdate = Partial<ISolutionCreate>;