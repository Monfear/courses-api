import { RequestHandler, Request, Response } from "express";
import { ILogin } from "../types/Login.interface";
import { User } from "../models/user.model";
import { hashPassword } from "../functions/hashPassword";
import { Logger } from "../utils/logger";
import { JwtPayload, sign } from 'jsonwebtoken';
import { IPayloadJWT } from "../types/Payload.interface";

const JWT_KEY: string | undefined = process.env.JWT_KEY;

if (!JWT_KEY) {
    console.warn('[!] No JWT key.');
};

const logger: Logger = new Logger('auth.controller.ts');

export const login: RequestHandler = async (req: Request, res: Response) => {
    try {
        const loginData: ILogin = req.body;

        const { name, password } = loginData;

        if (!name || !password) {
            throw new Error('No username or password provided.');
        };

        const user: User | null = await User.findOneBy({
            name
        });

        if (!user) {
            return res.status(403).json({
                success: false,
                errMsg: 'Login failed - invalid username.',
            });
        };

        const passwordHash: string = await hashPassword(password, user.passwordSalt);

        if (passwordHash !== user.passwordHash) {
            logger.info(`[i] User ${user.name} provided wrong password.`);

            return res.status(403).json({
                success: false,
                errMsg: 'Login failed - invalid password.',
            });
        };

        const payloadJWT: JwtPayload & IPayloadJWT = {
            userId: user.id,
            userName: user.name,
            isAdmin: user.isAdmin
        };

        if (!JWT_KEY) {
            throw new Error('No JWT key.');
        };

        const token: string | undefined = sign(payloadJWT, JWT_KEY, {
            algorithm: 'HS256',
            expiresIn: '30d'
        });

        return res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message,
            });
        };
    };
};