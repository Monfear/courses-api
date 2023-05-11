import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";
import { IUser } from "../types/User.interface";
import { hashPassword } from "../functions/hashPassword";
import { dataSource } from "../db/orm";
import { Repository } from "typeorm";
import { generatePasswordSalt } from "../functions/generatePasswordSalt";

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
        const { name, email, plainTextPassword, isAdmin } = userData;

        const repoUser: Repository<User> = dataSource.getRepository(User);

        const trackedUser: User | null = await repoUser.createQueryBuilder('user')
            .where('name = :name OR email = :email', { name, email })
            .getOne();

        // const trackedUser: User | null = await repoUser.findOne({
        //     where: [
        //         { name: name },
        //         { email: email }
        //     ],
        // });

        if (trackedUser) {
            return res.status(200).json({
                success: true,
                msg: 'User with provided name or email already exists.',
            });
        };

        const passwordSalt: string = generatePasswordSalt();
        const passwordHash = await hashPassword(plainTextPassword, passwordSalt);

        const user: User = User.create({
            name,
            email,
            passwordSalt,
            passwordHash,
            isAdmin
        });

        await user.save();

        return res.status(201).json({
            success: true,
            msg: 'User created.',
            data: {
                name,
                email,
                isAdmin
            },
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