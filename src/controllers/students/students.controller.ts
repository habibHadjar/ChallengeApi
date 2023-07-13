import {Request, Response} from "express";
import HttpResponse from '../../utility/Requests';
import {JWT} from "../../utility/JWT";
import {Email} from "../../utility/Email";

export default class StudentsController {
  public static async signin(req: Request, res: Response) {
    try {
      const { user_id, email } = res.locals.student;
      if (!user_id) return HttpResponse.requestError(res, {data: "Something went wrong !"});

      // Create the new JWT
      const jwt = new JWT();
      const encoded = await jwt.create({
        userId: user_id,
      }, {
        expiresIn: '30 minutes',
      }) as string;

      const emailer = new Email();

      const link = (process.env.FRONT_URL || 'http://localhost:' + (process.env.PORT || 5050)) + '/auth/login?jwt=' + encodeURIComponent(encoded);
      await emailer.sendMagicLink(email, link, 'Mon service');

      HttpResponse.noContent(res);
    } catch (err) {
      console.log(err);
      HttpResponse.requestError(res, JSON.stringify(err));
    }
  };

  public static async test(req: Request, res: Response) {
    try {
      // console.log("works");
      //
      // const ssh = new SSH({
      //   host: "212.47.246.64",
      //   username: "root",
      //   privateKey: readFileSync('~/.ssh/id_ed25519')
      // })
      // const result = await ssh.test();
      //
      // console.log(result);
      HttpResponse.success(res, {data: "It works"});
    } catch (err) {
      HttpResponse.requestError(res, JSON.stringify(err));
    }
  };
}