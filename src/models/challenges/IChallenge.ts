export interface IChallenge {
  id: number;
  name: string;
}

export type IChallengeRO = Readonly<IChallenge>;

export type IChallengeCreate = Omit<IChallenge, 'id'>;

export type IChallengeUpdate = Partial<IChallengeCreate>;