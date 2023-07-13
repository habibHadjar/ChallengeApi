import {Request, Response} from "express";
import HttpResponse from '../../utility/Requests';
import {JWT} from "../../utility/JWT";

export default class AdminsController {
  public static async signin(req: Request, res: Response) {
    try {
      const { id, email, password } = res.locals.admin;
      if (!email) return HttpResponse.requestError(res, {data: "Something went wrong !"});

      const { password: bodyPassword } = req.body;

      if (bodyPassword !== password) return HttpResponse.requestError(res, {data: "Wrong password !"});

      // Create the new JWT
      const jwt = new JWT();
      const encoded = await jwt.create({
        userId: id,
      }, {
        expiresIn: '30 minutes',
      }) as string;

      HttpResponse.success(res, {data: { jwt: encoded }});
    } catch (err) {
      console.log(err);
      HttpResponse.requestError(res, {data: "something went wrong"});
    }
  };
}