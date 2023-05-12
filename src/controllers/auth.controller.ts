import { RequestHandler, Request, Response } from "express";
import { ILogin } from "../types/Login.interface";
import { User } from "../models/user.model";
import { hashPassword } from "../functions/hashPassword";
import { Logger } from "../utils/logger";

const logger: Logger = new Logger();

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

        return res.status(200).json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
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