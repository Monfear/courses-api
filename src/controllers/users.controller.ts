import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";

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
