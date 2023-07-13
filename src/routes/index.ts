import {Router} from 'express';
import UsersRoutes from "./users/users.routes";
import StudentsRoutes from "./students/students.routes";
import AdminsRoutes from "./admins/admins.routes";

export default (app: Router) => {
  UsersRoutes(app);
  StudentsRoutes(app);
  AdminsRoutes(app);
};
