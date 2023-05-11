import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";
import { IUser } from "../types/User.interface";
import { hashPassword } from "../functions/hashPassword";


// @ GET
export const showAllUsers: RequestHandler = async (req: Request, res: Response) => {
    try {
        const users: User[] = await User.find();

        if (users.length < 1) {
            return res.status(200).json({
                success: true,
                msg: 'No users in database.',
            });
        };

        return res.status(200).json({
            success: true,
            numOfRecords: users.length,
            data: users
        });

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message
            });
        };
    }
};

// * POST
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userData: IUser = req.body;
        const { name, email, plainTextPassword, passwordSalt, isAdmin } = userData;

        let passwordHash: string | undefined = undefined;

        passwordHash = await hashPassword(plainTextPassword, passwordSalt);

        const user: User = User.create({
            name,
            email,
            passwordSalt,
            passwordHash,
            isAdmin
        });

        await user.save();

        console.log({
            success: true,
            msg: 'User created.',
            data: user
        })

        return res.status(201).json({
            success: true,
            msg: 'User created.',
            data: passwordHash
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                errMsg: error.message
            });
        };
    };
};