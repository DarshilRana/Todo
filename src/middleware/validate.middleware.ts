import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { EHttpCode, getMessage, HttpException } from '../utils';

export const validateUser = (req: Request, res: Response, next: NextFunction): void => {
    const accessToken = req.headers['accesstoken']; // ✅ reliable way to access custom header

    console.log("🔐 accessToken from header:", accessToken);

    if (!accessToken || typeof accessToken !== 'string') {
        throw new HttpException(EHttpCode.BAD_REQUEST, getMessage("invalidAccessToken"));
    }

    try {
        const decodedToken:any = jwt.verify(
            accessToken,
        "mynameiskamleshdhelloistheworldisfirstprintedinprogramwhen"
        );

        res.locals.user = {id:decodedToken.id}; // attach decoded user info to res.locals for downstream use
        // req.user = decoded; // optionally attach it for downstream use
        console.log("✅ Token is valid. User ID:", res.locals.user.id);
        next();
    } catch (error) {
        console.error('❌ Token validation error:', error);
        throw new HttpException(EHttpCode.UNAUTHORIZED, getMessage("invalidAccessToken"));
    }
}