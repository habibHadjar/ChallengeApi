import {NextFunction, Request, Response} from "express";
import { UserCreateValidator} from "../../models/users/IUser";
import HttpResponse from "../../utility/Requests";
import {StudentCreateValidator} from "../../models/students/IStudent";
import {AdminCreateValidator} from "../../models/admins/IAdmin";

export default class DataMiddleware {
  public static async user({body}: Request, res: Response, next: NextFunction) {
    try {
      const valid = UserCreateValidator(body);
      if (valid) return next();
      HttpResponse.requestError(res, { message: UserCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };

  public static async adminCredentials({body}: Request, res: Response, next: NextFunction) {
    try {
      const valid = AdminCreateValidator(body);
      if (valid) return next();
      HttpResponse.requestError(res, { message: AdminCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };

  public static async studentCredentials({body}: Request, res: Response, next: NextFunction) {
    try {
      const valid = StudentCreateValidator(body);
      if (valid) return next();
      HttpResponse.requestError(res, { message: StudentCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };

  public static async sshCredentials({body}: Request, res: Response, next: NextFunction) {
    try {
      // const valid = UserCreateValidator(body);
      // if (valid) return next();
      // HttpResponse.requestError(res, { message: UserCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };

  public static async sgbdrCredentials({body}: Request, res: Response, next: NextFunction) {
    try {
      // const valid = UserCreateValidator(body);
      // if (valid) return next();
      // HttpResponse.requestError(res, { message: UserCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };

  public static async challengeNext({body}: Request, res: Response, next: NextFunction) {
    try {
      // const valid = UserCreateValidator(body);
      // if (valid) return next();
      // HttpResponse.requestError(res, { message: UserCreateValidator.errors})
    } catch (err) {
      HttpResponse.requestError(res, { message: err})
    }
  };
}