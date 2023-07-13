import {Request, Response} from 'express';
import HttpResponse from '../../utility/Requests';
import {SSH} from '../../utility/SSH';
import { readFileSync } from 'fs';
import {CRUD} from "../../utility/DB/CRUD";
import {IUserRO} from "../../models/users/IUser";


export default class UsersController {
  public static async fetch(req: Request, res: Response) {
    console.log("here");
    try {
      const users = await CRUD.Index<any>({
        table: 'Users',
      })

      console.log(users);


      HttpResponse.success(res, {data: "It works"});
    } catch (err) {
      HttpResponse.requestError(res, JSON.stringify(err));
    }
  };
}