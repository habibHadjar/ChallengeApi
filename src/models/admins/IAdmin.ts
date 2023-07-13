import { IUser } from "../users/IUser";
import Ajv, {JSONSchemaType} from "ajv";

export interface IAdmin extends IUser {
  password: string;
}

export type IAdminRO = Readonly<IAdmin>;

export type IAdminCreate = Omit<IAdmin, 'id'>;

export type IAdminUpdate = Partial<IAdminCreate>;

const AdminCreateSchema : JSONSchemaType<IAdminCreate> = {
  type: "object",
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ["email", "password"],
  additionalProperties: false,
};
const ajv = new Ajv();
export const AdminCreateValidator = ajv.compile(AdminCreateSchema);
