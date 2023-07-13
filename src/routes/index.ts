import {Router} from 'express';
import UsersRoutes from "./users/users.routes";
import StudentsRoutes from "./students/students.routes";

export default (app: Router) => {
  UsersRoutes(app);
  StudentsRoutes(app);
};
