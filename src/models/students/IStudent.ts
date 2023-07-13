import { IGroup } from "../groups/IGroup";
import { IQuestion } from "../questions/IQuestion";
import { IUser } from "../users/IUser";
import Ajv, {JSONSchemaType} from "ajv";

export interface IStudent extends IUser {
  firstname: string;
  lastname: string;
  groups: IGroup[];
  questions: IQuestion[];
}

export type IStudentRO = Readonly<IStudent>;

export type IStudentCreate = Omit<IStudent, 'id'|'email'|'groups'|'questions'>;

export type IStudentUpdate = Partial<IStudentCreate>;

const StudentCreateSchema : JSONSchemaType<IStudentCreate> = {
  type: "object",
  properties: {
    firstname: { type: 'string' },
    lastname: { type: 'string' },
  },
  required: ["firstname", "lastname"],
  additionalProperties: false,
};
const ajv = new Ajv();
export const StudentCreateValidator = ajv.compile(StudentCreateSchema);
