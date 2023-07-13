import {Router} from "express";
import AdminsController from "../../controllers/admins/admins.controller";
import DataMiddleware from "../../middlewares/data/data.middleware";
import AuthMiddleware from "../../middlewares/auth/auth.middleware";

export default (app: Router) => {
  // Get all students' info
  app.post(
    "/admin/signin",
    DataMiddleware.adminCredentials,
    AuthMiddleware.admin,
    AdminsController.signin
  );
};
