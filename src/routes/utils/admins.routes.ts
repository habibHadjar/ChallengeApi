import {Router} from "express";
import UsersController from "../../controllers/users/users.controller";

export default (app: Router) => {
  app.get("/users", UsersController.fetch);
};
