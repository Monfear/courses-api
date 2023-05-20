import { Request, Response, RequestHandler } from "express";
import { User } from "../models/user.model";
import { IUser } from "../types/User.interface";
import { hashPassword } from "../functions/hashPassword";
import { dataSource } from "../db/orm";
import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { generatePasswordSalt } from "../functions/generatePasswordSalt";

// @ GET ALL
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
    };
};

// @ GET SINGLE
export const showSingleUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const user: User | null = await User.findOneBy({
            id
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User doesn\'t exist.'
            });
        };

        return res.status(200).json({
            success: true,
            data: user,
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

// * POST
export const createUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const userData: IUser = req.body;
        const { name, email, plainTextPassword, isAdmin } = userData;

        const repoUser: Repository<User> = dataSource.getRepository(User);

        const trackedUser: User | null = await repoUser.createQueryBuilder('user')
            .where('user.name = :name OR user.email = :email', { name, email })
            .getOne();

        // const trackedUser: User | null = await repoUser.findOne({
        //     where: [
        //         { name: name },
        //         { email: email }
        //     ],
        // });

        if (trackedUser) {
            return res.status(409).json({
                success: false,
                msg: 'User with provided name or email already exists.',
            });
        };

        const passwordSalt: string = generatePasswordSalt();
        const passwordHash = await hashPassword(plainTextPassword, passwordSalt);

        const user: User = User.create({
            name,
            email,
            isAdmin,
            passwordSalt,
            passwordHash,
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

// ? PATCH
export const editUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const user: User | null = await User.findOneBy({
            id
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User doesn\'t exist.',
                info: {
                    affected: 0,
                },
            });
        };

        const modificationData: Partial<IUser> = req.body;
        let updatedUser: Partial<User> | undefined = undefined;

        if (!modificationData.plainTextPassword) {
            updatedUser = modificationData;
        } else {
            const passwordSalt: string = generatePasswordSalt();
            const passwordHash = await hashPassword(modificationData.plainTextPassword, passwordSalt);

            updatedUser = {
                name: modificationData?.name || undefined,
                email: modificationData?.email || undefined,
                isAdmin: modificationData?.isAdmin || undefined,
                passwordSalt,
                passwordHash
            };
        };

        const result: UpdateResult = await User
            .createQueryBuilder()
            .update(User)
            .set(updatedUser)
            .where('id = :userId', { userId: id })
            .execute();

        return res.status(200).json({
            success: true,
            msg: 'User updated.',
            updatedData: updatedUser,
            info: result,
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

// ! DELETE
export const deleteUser: RequestHandler = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);

        const user: User | null = await User.findOneBy({
            id
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                msg: 'User doesn\'t exist.',
                info: {
                    affected: 0,
                },
            });
        };

        const result: DeleteResult = await User.delete({
            id
        });

        return res.status(200).json({
            success: true,
            msg: `User ${user.name} has been deleted succesfully.`,
            info: result,
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