import { NextFunction, Request, Response } from "express";
import { EHttpCode, getMessage, HttpException } from "../utils";
import authService from "../service/auth.service";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            body: { email, password }
        } = req
        if (!password) {
            throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("dataNotFound"))
        }
        const result = await authService.login(email, password)
        res.locals.data = result


        next();
    } catch (error) {
        next(error)
    }
}