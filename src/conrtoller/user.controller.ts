import { NextFunction, Request, Response } from "express";
import { HttpException, EHttpCode, getMessage } from "../utils";
import userService from "../service/user.service";

// signup user
export const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    if (!userData) {
      throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
    }
    const data = await userService.addUser(userData);
    res.locals.data = data;
    next();
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log("id", id);
    const userData = req.body;
    userData.id = id;
    if (!userData) {
      throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
    }
    const data = await userService.updateUser(userData);
    res.locals.data = data;
    next();
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
    }
    const data = await userService.deleteUser(id);
    res.locals.data = { message: getMessage("userDeleted") };
    next();
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
    }
    const data = await userService.getUser(id);
    res.locals.data = data;
    next();
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await userService.getAllUser();
    res.locals.data = data;
    next();
  } catch (error) {
    next(error);
  }
};
