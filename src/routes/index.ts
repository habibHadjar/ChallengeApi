import {Router} from 'express';
import UsersRoutes from "./users/users.routes";

export default (app: Router) => {
  UsersRoutes(app);
};
