export interface IStudentChallenge {
  user_id: number;
  challenge_id: number;
  shell_ip?: string;
  shell_username?: string;
}

export type IStudentChallengeRO = Readonly<IStudentChallenge>;

export type IStudentChallengeCreate = IStudentChallenge;

export type IStudentChallengeUpdate = Partial<IStudentChallengeCreate>;