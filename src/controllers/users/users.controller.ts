import {Request, Response} from "express";
import HttpResponse from '../../utility/Requests';

export default class UsersController {
  public static async fetch(req: Request, res: Response) {
    try {
      HttpResponse.success(res, {data: "It works"});
    } catch (err) {
      HttpResponse.requestError(res, JSON.stringify(err));
    }
  };
}