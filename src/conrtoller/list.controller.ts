
import { NextFunction, Request, Response } from "express";
import { HttpException, EHttpCode, getMessage } from "../utils";
import listService from "../service/list.service";

// signup user
export const addList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listData = req.body
        listData.user = res.locals.user.id; // Attach user ID from token
        if (!listData) {
            throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"))
        }
        const data = await listService.addList(listData)
        res.locals.data = data;
        next()

    } catch (error) {
        next(error)
    }
}

export const getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listId = req.params.id
        if (!listId) {
            throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
        }
        const list = {
            user: res.locals.user.id,
            _id: listId
        }
        const data = await listService.getList(list);
        res.locals.data = data;
        next();
    } catch (error) {
        next(error);
    }
}

export const deleteList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const listId = req.params.id
        if (!listId) {
            throw new HttpException(EHttpCode.FORBIDDEN, getMessage("dataNotFound"));
        }
        const userId = res.locals.user.id;
        const data = await listService.deleteList(listId, userId);
        res.locals.data = data
        next();
    } catch (error) {
        next(error);
    }
}

export const getallList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.user.id;
        const data = await listService.getAllList(userId);
        res.locals.data = data;
        next();
    } catch (error) {
        next(error);
    }
}

export const updateList = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const listId = req.params.id;
        const listData = req.body
        if(res.locals.user.id !== listData.user){
            throw new HttpException(EHttpCode.UNAUTHORIZED,getMessage("notAuthorized"))
        }
        const data = await listService.updateList(listId,listData);
        res.locals.data = data;
        next();
    } catch (error) {
        next(error);
    }
}
