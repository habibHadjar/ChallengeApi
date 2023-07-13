import {Router} from "express";
import AdminsController from "../../controllers/admins/admins.controller";

export default (app: Router) => {
  app.get("/admins/signin", AdminsController.signin);
};
