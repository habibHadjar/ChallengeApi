export interface IStudentChallenge {
  user_id: number;
  challenge_id: number;
  shell_ip?: string;
  shell_username?: string;
  db_ip?: string;
  db_port?: string;
  db_user?: string;
  db_password?: string;
  db_table?: string;
}

export type IStudentChallengeRO = Readonly<IStudentChallenge>;

export type IStudentChallengeCreate = IStudentChallenge;

export type IStudentChallengeUpdate = Partial<IStudentChallengeCreate>;