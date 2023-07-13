import Ajv, {JSONSchemaType} from "ajv";

export interface IUser {
  id: number;
  email: string;
}

export type IUserRO = Readonly<IUser>;

export type IUserCreate = Omit<IUser, 'id'>;

export type IUserUpdate = Partial<IUserCreate>;

const UserCreateSchema : JSONSchemaType<IUserCreate> = {
  type: "object",
  properties: {
    email: { type: 'string' },
  },
  required: ["email"],
  additionalProperties: false,
};
const ajv = new Ajv();
export const UserCreateValidator = ajv.compile(UserCreateSchema);
