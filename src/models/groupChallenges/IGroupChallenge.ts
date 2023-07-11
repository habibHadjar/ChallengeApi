export interface IGroupChallenge {
  group_id: number;
  challenge_id: number;
}

export type IGroupChallengeRO = Readonly<IGroupChallenge>;

export type IGroupChallengeCreate = IGroupChallenge;

export type IGroupChallengeUpdate = Partial<IGroupChallengeCreate>;