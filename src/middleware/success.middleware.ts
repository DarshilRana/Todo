import { Request, Response } from "express";
import { EHttpCode, EResponseType } from "../utils";

export const successResponse = async (req: Request, res: Response) => {
  let statusCode = EHttpCode.OK;
  let response = {
    responseType: EResponseType.Success,
    statusCode: EHttpCode.OK,
    message: res.locals.message || "Success",
    data: res.locals.data || res.locals || {},
  };
  res.status(statusCode).json(response);
};
