import {Response} from "express";

const HttpResponse = {
  // Success
  success:    (res: Response, data: any) => res.status(200).send(data),
  created:    (res: Response, data: any) => res.status(201).send(data),
  noContent:  (res: Response) => res.status(204).send(),

  // Conflicts
  conflicts:  (res: Response, data: any) => res.status(409).send(data),
  userExists: (res: Response, data: any) => res.status(409).send(data),
  requestError: (res: Response, data: any) => res.status(400).send(data),
};

export default HttpResponse;