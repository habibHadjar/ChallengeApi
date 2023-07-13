import {NextFunction, Request, Response} from "express";
import HttpResponse from "../../utility/Requests";
import {IUserCreate, IUserRO} from "../../models/users/IUser";
import {CRUD} from "../../utility/DB/CRUD";
import {IStudentRO} from "../../models/students/IStudent";
import {IAdminRO} from "../../models/admins/IAdmin";

export default class AuthMiddleware {
  public static async verify(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    next();
  };

  public static async studentOrAdmin(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    next();
  };

  public static async studentEmail(req: Request<IUserCreate>, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;

      const user = await CRUD.Read<IUserRO>({
        table: 'Users',
        idKey: 'email',
        idValue: email,
      });

      if (!user) {
        const { id: user_id } = await CRUD.Create({
          body: { email },
          table: 'Users'
        });
        res.locals.student = await CRUD.Create({
          body: { user_id },
          table: 'Students'
        });
        res.locals.student.email = email;
        return next();
      }

      const admin = await CRUD.Read<IAdminRO>({
        table: 'Admins',
        idKey: 'user_id',
        idValue: user.id,
      });

      if (admin) return HttpResponse.requestError(res, { data: "You can't be Admin and Student !"});

      res.locals.student = await CRUD.Read<IStudentRO>({
        table: 'Students',
        idKey: 'user_id',
        idValue: user.id,
      });
      res.locals.student.email = email;
      next();
    } catch (e) {
      console.log("here");
      HttpResponse.requestError(res, JSON.stringify(e));
    }
  };

  public static async student(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    next();
  };

  public static async admin(req: Request, res: Response, next: NextFunction) {
    console.log(req);
    next();
  };
}