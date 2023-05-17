import { Request, Response, NextFunction } from "express";
import { Logger } from "../utils/logger";
import { JwtPayload, verify } from "jsonwebtoken";
import { IPayloadJWT } from "../types/Payload.interface";

const JWT_KEY: string | undefined = process.env.JWT_KEY;

if (!JWT_KEY) {
    console.warn('[!] No JWT key.');
};

const logger: Logger = new Logger('validateUser.middleware.ts');

export function validateUser(req: Request, res: Response, next: NextFunction) {
    if (!JWT_KEY) {
        return res.status(403).json({
            success: false,
            errMsg: '[!] No JWT key.'
        });
    };

    const token: string | undefined = req.headers.authorization;

    if (!token) {
        logger.info('The authentication JWT is not present, access denied.');

        return res.status(403).json({
            success: false,
            errMsg: 'The authentication JWT is not present, access denied.'
        });
    };

    let decodedToken: JwtPayload & IPayloadJWT | null = null;

    try {
        decodedToken = verify(token, JWT_KEY) as JwtPayload & IPayloadJWT;
        logger.info(`User: ${decodedToken.userName} succesfully decoded.`);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(403).json({
                success: false,
                errMsg: error.message
            })
        };
    };

    next();
};