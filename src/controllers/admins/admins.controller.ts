import {Request, Response} from "express";
import HttpResponse from '../../utility/Requests';

export default class AdminsController {
  public static async signin(req: Request, res: Response) {
    try {
      HttpResponse.success(res, {data: "It works"});
    } catch (err) {
      HttpResponse.requestError(res, JSON.stringify(err));
    }
  };
}